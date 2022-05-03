<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto" default-selected-key="3"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
				<Header></Header>
				<div style="margin: 24px">
          <a-table :columns="columns" :data-source="checkedActivitiesInfo"
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
  name: "CheckedActivities",
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
          width: '20%',
        },
        {
          title: '活动起止时间',
          dataIndex: 'activityTime',
          key: 'activityTime',
          width: '40%',
        },
        {
          title: '活动地点',
          dataIndex: 'activityLocation',
          key: 'activityLocation',
          width: '25%',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '15%',
        }
      ]
    }
  },
  computed: {
    ...mapState({
      checkedActivitiesInfo: state => state.checkedActivities.checkedActivitiesInfo
    })
  },
  methods: {
    getCheckedActivitiesInfo () {
      const that = this
      // console.log('fafaf')
      this.$store.dispatch('GET_CHECKED_ACTIVITIES').then(() => {
        // console.log('成功')
      })
          .catch(() => {
            that.$message.error('加载已通过活动列表失败')
          })
    },
    routeToActivity (activityId) {
      this.$router.push('/asr-activity/checked/activity/' + activityId)
    }
  },
  mounted () {
    this.getCheckedActivitiesInfo()
  }
}
</script>

<style scoped>

</style>