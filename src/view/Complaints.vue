<template>
  <div class="h-full">
    <a-row class="h-full">
      <a-col span="3" class="h-full" style="width: 250px">
        <Navbar class="w-auto" default-selected-key="7"></Navbar>
      </a-col>
      <a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
        <Header></Header>
        <div style="margin: 24px">
          <a-table :columns="columns"
                   :data-source="complaintList"
                   rowKey="id"
                   class="w-auto"
          >
            <span slot="customTitle">用户id</span>
            <span slot="avatarUrl" slot-scope="avatarUrl"><img :src="avatarUrl" alt="无"/></span>
            <span slot="authority" slot-scope="authority">{{authority === 0 ? '发布话题' :
                                                            authority === 1 ? '发布评论' :
                                                            authority === 2 ? '发布委托' :
                                                            authority === 3 ? '接取委托' : 'error!'}}</span>
            <span slot="action" slot-scope="record">
              <a style="color: #00A0E9" @click="routeToComplaint(record.id)">举报详情</a>
            </span>
          </a-table>
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
  name: "Complaints",
  components: {
    Navbar,
    Header
  },
  data: () => ({
    columns: [
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
        width: '4%',
      },
      {
        dataIndex: 'user.id',
        key: 'userid',
        slots: {title: 'customTitle'},
        scopedSlots: {customRender: 'userid'},
        width: '4%',
      },
      {
        title: '昵称',
        dataIndex: 'user.nickName',
        key: 'nickName',
        width: '15%',
        // ellipsis: true
      },
      {
        title: '用户头像',
        dataIndex: 'user.avatarUrl',
        key: 'avatarUrl',
        scopedSlots: {customRender: 'avatarUrl'},
        width: '10%',
      },
      {
        title: '举报理由',
        dataIndex: 'reason',
        key: 'reason',
        width: '25%',
      },
      {
        title: ' 时间',
        dataIndex: 'create_time',
        key: 'create_time',
        width: '10%',
      },
      {
        title: '请求限制权限',
        key: 'authority',
        dataIndex: 'authority',
        scopedSlots: {customRender: 'authority'},
        width: '12%',
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        width: '20%',
      }
    ],
    src: ''
  }),
  computed: {
    ...mapState({
      complaintList: state => state.complaints.complaintList
    })
  },
  methods: {
    getInfo() {
      const that = this
      this.$store.dispatch('GET_COMPLAINT_LIST')
          .catch(() => {
            // console.log(err)
            that.$message.error('获取用户失败')
          })
    },
    routeToComplaint(complaintId) {
      console.log(complaintId)
      this.$router.push('/asr-user-manage/complaint' + complaintId)
    },
  },
  mounted () {
    this.getInfo()
    // console.log(this.complaintList)
    // console.log(this.complaintList[0].id)
  }
}

</script>

<style scoped>

</style>