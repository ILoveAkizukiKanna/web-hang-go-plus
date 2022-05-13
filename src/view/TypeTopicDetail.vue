<template>
  <div class="h-full">
    <a-row class="h-full">
      <a-col span="3" class="h-full" style="width: 250px">
        <Navbar class="w-auto"></Navbar>
      </a-col>
      <a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
        <Header :is-back="true" back-comments="返回委托类别列表"></Header>
        <div v-if="loaded">
          <a-page-header>
            <!--						<div class="text-4xl flex-grow mb-6 text-gray-700"></div>-->
            <a-card class="mb-3">
              <a-descriptions title="基本信息">
                <a-descriptions-item label="类别名称">{{ typeTopicDetailInfo.name }}</a-descriptions-item>
              </a-descriptions>
            </a-card>
            <a-card class="mb-3">
              <a-descriptions title="图片"></a-descriptions>
              <div class="flex flex-row flex-wrap" v-if="typeTopicDetailInfo.hasPhoto">
                <div class="w-1/3 px-2">
                  <div class="h-72 bg-gray-100 border">
                    <img class="object-contain w-full h-full" :src="typeTopicDetailInfo.photo"  alt=" "/>
                  </div>
                </div>
              </div>
              <p v-else>无</p>
            </a-card>

            <div class="w-full h-16">
              <div class="w-1/2 h-full space-x-4">
                <button
                    class="w-1/5 h-full text-lg ant-btn-danger focus:border-0"
                    @click="deleteType(typeTopicDetailInfo.typeId)">删除</button>
                <a-spin size="large" :spinning="spinning" />
                <button
                    class="w-1/5 h-full text-lg ant-btn-primary focus:border-0"
                    @click="showChange(typeTopicDetailInfo.typeId)">修改</button>
                <a-spin size="large" :spinning="spinning" />
              </div>

              <div>
                <a-modal v-model="visible" title="修改类别">
                  <template #footer>
                    <a-button key="submit" type="primary" :loading="loading" @click="handleOk(typeTopicDetailInfo.typeId)">提交</a-button>
                  </template>
                  <div>
                    <h5>修改名称</h5><br>
                    <a-input v-model="typeTopicDetailInfo.name" placeholder="类别名称" />
                    <br><br><br><br>
                    <h5>修改图片</h5><br>
                    <form action="" enctype="multipart/form-data">
                      <input type="file" name="" id="file" class="filepath" accept="image/jpeg,image/jpg,image/png" @change="changeImage" />
                      <img :src="(src=='')?typeTopicDetailInfo.photo:src" id="show" >
                    </form>
                  </div>
                </a-modal>
              </div>
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
  name: "TypeTopicDetail",
  components: {
    Navbar,
    Header
  },
  data () {
    return {
      loaded: false,
      rejectReason: '',
      spinning: false,

      visible: false,
      loading: false,
      src: ''
    }
  },
  computed: {
    ...mapState({
      typeTopicDetailInfo: state => state.typeTopicDetail.typeTopicDetailInfo,
    })
  },

  methods: {
    onClickBack() {
      this.$router.back()
    },
    getInfo() {
      this.loaded = false
      const that = this
      this.$store.dispatch('GET_TYPE_TOPIC_DETAIL', {
        typeId: that.$route.params.typeId
      }).catch(() => {
        that.$message.error('加载类别详细信息失败')
      }).then(() => {
        that.loaded = true
      })
    },
    deleteType(typeId) {
      const that = this
      this.$confirm({
        title: '确认删除该类别吗？',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.$store.dispatch('DEL_TYPE_TOPIC', {
            typeId: typeId,
          }).then((data) => {
            if (data) {
              that.$message.success('操作成功')
              // this.$router.push('/asr-topic/type/topic')
            }
          }).catch(() => {
            that.$message.error('操作失败')
          })
        }
      })
    },
    showChange(typeId) {
      this.$data.visible = true
      console.log(typeId)

    },
    changeImage(e) {
      var file = e.target.files[0];
      var reader = new FileReader();
      var that = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        that.src = this.result
      };
    },
    handleOk(typeId) {
      console.log(typeId)
      const that = this
      that.$store.dispatch('CHANGE_TYPE_TOPIC', {
        typeId: typeId,
        name: that.typeTopicDetailInfo.name,
        // photo: that.typeCommissionDetailInfo.photo
        photo: that.src
      }).then((data) => {
        if (data) {
          that.$message.success('操作成功')
          that.$data.visible = false
          this.$router.push('/asr-topic/type/topic')
        }
      }).catch(() => {
        that.$message.error('操作失败')
      })
    },
  },
  mounted() {
    this.getInfo()
  }
}
</script>

<style scoped>

</style>