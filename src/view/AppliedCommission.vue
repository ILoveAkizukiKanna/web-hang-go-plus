<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto" default-selected-key="5"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 250px" class="h-full">
				<Header></Header>
				<div style="margin: 24px">
          <a-table :columns="columns" :data-source="appliedCommissionInfo"
                   class="w-auto">
            <span slot="customTitle"><a-icon type="carry-out" /> 委托名称</span>
            <span slot="action" slot-scope="text, record">
				<a style="color: #00A0E9" @click="routeToCommission(record.commissionId)">查看委托详情</a>
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
  name: "AppliedCommission",
  components: {
    Navbar,
    Header
  },
  data () {
    return {
      columns: [
        {
          dataIndex: 'commissionName',
          key: 'commissionName',
          slots: { title: 'customTitle' },
          width: '20%',
        },
        {
          title: '委托起止时间',
          dataIndex: 'commissionTime',
          key: 'commissionTime',
          width: '40%',
        },
        {
          title: '是否实时',
          dataIndex: 'isReal',
          key: 'isReal',
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
      appliedCommissionInfo: state => state.appliedCommission.appliedCommissionInfo
    })
  },
  methods: {
    getAppliedCommissionInfo () {
      const that = this
      this.$store.dispatch('GET_APPLIED_COMMISSION').then(() => {
      })
          .catch(() => {
            that.$message.error('加载委托列表失败')
          })
    },
    routeToCommission (commissionId) {
      this.$router.push('/asr-commission/acommission/' + commissionId)
    }
  },
  mounted () {
    this.getAppliedCommissionInfo()
  }
}
</script>

<style scoped>

</style>