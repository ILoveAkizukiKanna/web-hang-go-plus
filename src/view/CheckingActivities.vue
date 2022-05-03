<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto" default-selected-key="2"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
				<Header></Header>
				<div style="margin: 24px">
          <a-table :columns="columns" :data-source="checkingActivitiesInfo"
                   class="w-auto"
          >
            <span slot="customTitle"><a-icon type="profile" /> 活动名称</span>
            <span slot="action" slot-scope="text, record">
                         <a style="color: #00A0E9" @click="routeToActivity(record.activityId)">查看活动详情</a>
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
  name: "checkingActivities",
  components: {
    Navbar,
    Header
  },
  data () {
    return {
      columns: [
        {
          dataIndex: 'activityName',
          key: 'activityName',
          slots: { title: 'customTitle' },
          width: "20%",
        },
        {
          title: '活动起止时间',
          dataIndex: 'activityTime',
          key: 'activityTime',
          width: "40%",
        },
        {
          title: '活动地点',
          dataIndex: 'activityLocation',
          key: 'activityLocation',
          width: "25%",
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: "15%",
        }
      ]
    }
  },
  computed: {
    ...mapState({
      checkingActivitiesInfo: state => state.checkingActivities.checkingActivitiesInfo
    })
  },
  methods: {
    getCheckingActivitiesInfo () {
      const that = this
      this.$store.dispatch('GET_CHECKING_ACTIVITIES')
          .catch(() => {
            that.$message.error('加载待审核活动列表失败')
          }).then(() => {
      })
    },
    routeToActivity (activityId) {
      this.$router.push('/asr-activity/checking/activity/' + activityId)
    }
  },
  mounted () {
    this.getCheckingActivitiesInfo()
    // console.log(this.checkingActivitiesInfo)
  }
}
</script>

<style scoped>
.ant-pro-global-header {
  position: relative;
  height: 64px;
  padding: 0;
  background: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
</style>