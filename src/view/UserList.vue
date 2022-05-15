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
                   :data-source="userList"
                   rowKey="id"
                   class="w-auto"
          >
            <span slot="customTitle">用户id</span>
			<span slot="gender" slot-scope="gender">{{gender === 0 ? '未知' : gender === 1 ? '男' : '女'}}</span>
			<span slot="avatarUrl" slot-scope="avatarUrl"><img :src="avatarUrl" alt="无"/></span>
			
			<span slot="action" slot-scope="text, record">
				<a style="color: #00A0E9" @click="routeToAuth(record.id)">管理用户权限</a>
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
  name: "UserList",
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
        width: '8%',
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
        title: '电子邮箱',
        dataIndex: 'email',
        key: 'email',
        width: '25%',
      },
      {
        title: '发布活动综合评分',
        key: 'avg_score',
        dataIndex: 'avg_score',
        width: '15%',
      },
      {
        title: '性别',
        key: 'gender',
        dataIndex: 'gender',
        scopedSlots: {customRender: 'gender'},
        width: '7%',
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
      userList: state => state.userList.userList
    })
  },
  methods: {
    getUserList() {
      const that = this
      this.$store.dispatch('GET_USER_LIST')
          .catch(() => {
            // console.log(err)
            that.$message.error('获取用户失败')
          })
    },
	routeToAuth(userId) {
		this.$router.push('/asr-user-auth/' + userId)
	}
  },
  mounted () {
    this.getUserList()
  }
}

</script>

<style scoped>

</style>