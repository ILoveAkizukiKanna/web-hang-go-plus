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
                   :data-source="appealList"
                   rowKey="id"
                   class="w-auto"
          >
            <span slot="customTitle">用户id</span>
			<span slot="avatarUrl" slot-scope="avatarUrl"><img :src="avatarUrl" alt="无"/></span>
			<span slot="action" slot-scope="text, record">
				<a style="color: #00A0E9" @click="routeToDetail(record.id)">处理申诉</a>
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
  name: "Appeal",
  components: {
    Navbar,
    Header
  },
  data: () => ({
    columns: [
      {
        dataIndex: 'userId',
        key: 'userId',
        slots: {title: 'customTitle'},
        scopedSlots: {customRender: 'userId'},
        width: '10%',
      },
      {
        title: '昵称',
        dataIndex: 'nickName',
        key: 'nickName',
        width: '15%',
        // ellipsis: true
      },
      {
        title: '用户头像',
        dataIndex: 'avatarUrl',
        key: 'avatarUrl',
        scopedSlots: {customRender: 'avatarUrl'},
        width: '10%',
      },
      {
        title: '申诉原因',
        dataIndex: 'reason',
        key: 'reason',
        width: '30%',
      },
      {
        title: '申请权限',
        dataIndex: 'auth',
        key: 'auth',
        width: '15%',
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
      appealList: state => state.appeal.appealList
    })
  },
  methods: {
    routeToDetail(appealId) {
      this.$router.push('/asr-user-manage/appeal/detail/' + appealId)
    },
    getAppealList() {
      const that = this
      this.$store.dispatch('GET_APPEAL_LIST')
          .catch(() => {
            // console.log(err)
            that.$message.error('获取申诉列表失败')
          })
    },
  },
  mounted () {
    this.getAppealList()
  }
}
</script>

<style scoped>

</style>