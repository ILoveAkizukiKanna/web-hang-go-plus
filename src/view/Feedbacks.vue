<template>
  <div class="h-full">
    <a-row class="h-full">
      <a-col span="3" class="h-full" style="width: 250px">
        <Navbar class="w-auto" default-selected-key="6"></Navbar>
      </a-col>
      <a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
        <Header></Header>
        <div style="margin: 24px">
          <a-table :columns="columns" :data-source="feedback" rowKey="id">
            <span slot="customTitle">反馈id</span>
            <span slot="action" slot-scope="text, record">
                         <a style="color: #00A0E9" @click="handleFeedback(record.id)">处理反馈</a>
                    </span>
            <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
              反馈内容：{{ record.content }}
            </p>
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
  name: "Feedbacks",
  components: {
    Navbar,
    Header
  },
  data: () => ({
    columns: [
      {
        dataIndex: 'id',
        key: 'id',
        slots: {title: 'customTitle'},
        scopedSlots: {customRender: 'id'},
        width: "10%",
      },
      {
        title: '用户id',
        dataIndex: 'user.id',
        key: 'user.id',
        width: "10%",
      },
      {
        title: '用户邮箱',
        dataIndex: 'user.email',
        key: 'user.email',
        width: "30%",
      },
      {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: "30%",
      },
      {
        title: '操作',
        key: 'action',
        scopedSlots: { customRender: 'action' },
        width: "20%",
      },
    ],
    src: ''
  }),
  computed: {
    ...mapState({
      feedback: state => state.feedbacks.feedback
    })
  },
  methods: {
    getFeedback() {
      const that = this
      this.$store.dispatch('GET_FEEDBACK')
          .catch(() => {
            // console.log(err)
            that.$message.error('获取用户反馈失败')
          })
    },
    handleFeedback(id) {
      const that = this
      this.$confirm({
        title: '确认处理该反馈吗?',
        okText: '确定',
        okType: 'info',
        cancelText: '取消',
        onOk () {
          that.$store.dispatch('HANDLE_FEEDBACK', {
            id: id
          }).then(data => {
            if (data) {
              that.$message.success('操作成功')
              that.getFeedback()
            }
          }).catch(() => {
            // console.log(err)
            that.$message.error('操作失败')
          })
        }
      })
    },
  },
  mounted () {
    this.getFeedback()
    // console.log(this.feedback)
  }
}

</script>

<style scoped>

</style>