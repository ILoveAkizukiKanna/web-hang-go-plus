<template>
  <div class="h-full">
    <a-row class="h-full">
      <a-col span="3" class="h-full" style="width: 250px">
        <Navbar class="w-auto"></Navbar>
      </a-col>
      <a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
        <Header :is-back="true" back-comments="返回用户列表"></Header>
        <div v-if="loaded">
          <a-page-header>
            <a-card class="mb-3">
              <a-descriptions title="举报人信息">
                <a-descriptions-item label="用户ID">{{ complaintInfo.user.id }}</a-descriptions-item>
                <a-descriptions-item label="用户昵称">{{ complaintInfo.user.nickName }}</a-descriptions-item>
<!--                <a-descriptions-item label="用户头像">-->
<!--                  <div class="flex flex-row flex-wrap" v-if="complaintInfo.user.hasPhoto">-->
<!--                    <div class="w-1/3 px-2">-->
<!--                      <div class="h-72 bg-gray-100 border">-->
<!--                        <img class="object-contain w-full h-full" :src="complaintInfo.user.avatarUrl"  alt=" "/>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </a-descriptions-item>-->
              </a-descriptions>
            </a-card>
            <a-card class="mb-3">
              <a-descriptions title="被举报人信息">
                <a-descriptions-item label="用户ID">{{ complaintInfo.to_user.id }}</a-descriptions-item>
                <a-descriptions-item label="用户昵称">{{ complaintInfo.to_user.nickName }}</a-descriptions-item>
<!--                <a-descriptions-item label="用户头像">-->
<!--                  <div class="flex flex-row flex-wrap" v-if="complaintInfo.to_user.hasPhoto">-->
<!--                    <div class="w-1/3 px-2">-->
<!--                      <div class="h-72 bg-gray-100 border">-->
<!--                        <img class="object-contain w-full h-full" :src="complaintInfo.to_user.avatarUrl"  alt=" "/>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </a-descriptions-item>-->
              </a-descriptions>
            </a-card>
            <a-card class='mb-3'>
              <a-descriptions title="举报详情">
                <a-descriptions-item label="举报权限">{{complaintInfo.authority === 0 ? '发布话题' :
                                                      complaintInfo.authority === 1 ? '发布评论' :
                                                      complaintInfo.authority === 2 ? '发布委托' :
                                                      complaintInfo.authority === 3 ? '接取委托' : 'error!'}}</a-descriptions-item>
                <a-descriptions-item label="举报时间">{{ complaintInfo.create_time }}</a-descriptions-item>
                <a-descriptions-item label="举报理由">{{ complaintInfo.reason}}</a-descriptions-item>
              </a-descriptions>
            </a-card>

            <div class="w-full h-16">
              <div class="w-1/2 h-full space-x-4">
                <button
                    class="w-1/5 h-full text-lg ant-btn-primary focus:border-0"
                    @click="pass(complaintInfo.id)"
                >通过</button>
                <button
                  class="w-1/5 h-full text-lg ant-btn-danger focus:border-0"
                  @click="showModal()"
                >驳回</button>
                <a-spin size="large" :spinning="spinning" />
              </div>
            </div>

            <div>
              <a-modal v-model="visible" title="驳回举报">
                <template #footer>
                  <a-button key="submit" type="primary" :loading="loading" @click="notPass(complaintInfo.id)">提交</a-button>
                </template>
                <div>
                  <h5>输入驳回理由</h5><br>
                  <a-input v-model="reason" placeholder="驳回理由" />
                </div>
              </a-modal>
            </div>
          </a-page-header>
        </div>
      </a-col>
    </a-row>
  </div>
</template>


<script>
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import {mapState} from 'vuex'
export default {
  name: "Complaint",
  components: {
    Navbar,
    Header
  },
  data () {
    return {
      loaded: false,
      spinning: false,

      visible: false,
      reason: ''
    }
  },
  computed: {
    ...mapState({
      complaintInfo: state => state.complaint.complaintInfo,
    })
  },
  methods: {
    onClickBack () {
      this.$router.back()
    },
    getInfo () {
      this.loaded = false
      const that = this
      this.$store.dispatch('GET_COMPLAINT_INFO', {
        complaintId: that.$route.params.complaintId
      }).then(() => {
        that.loaded = true
        console.log('userid')
        console.log(that.complaintInfo)
      }).catch(() => {
        that.$message.error('加载用户权限信息失败')
        that.loaded = true
      })
    },
    showModal () {
      this.visible = true
    },
    notPass (complaintId) {
      const that = this
      this.$confirm({
        title: '确定驳回该用户的举报吗？',
        okText: '确定',
        okType: 'info',
        cancelText: '取消',
        onOk () {
          that.spinning = true
          that.$store.dispatch('NOT_PASS_COMPLAINT', {
            complaintId: complaintId,
            reason: that.reason
          }).catch(() => {
            that.spinning = false
            that.$message.error('操作失败')
          }).then(data => {
            if (data) {
              that.spinning = false
              that.$message.success('操作成功')
              that.$router.back()
            }
          })
        }
      })
    },
    pass (complaintId) {
      const that = this
      this.$confirm({
        title: '确定通过该用户的举报吗？',
        okText: '确定',
        okType: 'info',
        cancelText: '取消',
        onOk () {
          that.spinning = true
          that.$store.dispatch('PASS_COMPLAINT', {
            complaintId: complaintId
          }).catch(() => {
            that.spinning = false
            that.$message.error('操作失败')
          }).then(data => {
            if (data) {
              that.spinning = false
              that.$message.success('操作成功')
              that.$router.back()
            }
          })
        }
      })
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>

</style>
