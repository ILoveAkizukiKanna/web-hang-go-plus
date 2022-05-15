<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto" default-selected-key="3"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 250px" class="h-full">
				<Header></Header>
				<div style="margin: 24px">
          <a-table :columns="columns" :data-source="topicsInfo"
                   class="w-auto">
            <span slot="customTitle"><a-icon type="aliwangwang" /> 话题名称</span>
            <span slot="action" slot-scope="text, record">
				<a style="color: #00A0E9" @click="routeToTopic(record.topicId)">查看话题详情</a>
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
  name: "Topics",
  components: {
    Navbar,
    Header
  },
  data () {
    return {
      columns: [
        {
          dataIndex: 'topicName',
          key: 'topicName',
          slots: { title: 'customTitle' },
          width: '20%',
        },
        {
          title: '话题发布时间',
          dataIndex: 'topicTime',
          key: 'topicTime',
          width: '20%',
        },
        {
          title: '点赞数',
          dataIndex: 'likes',
          key: 'likes',
          width: '10%',
        },
		{
			title: '关注数',
			dataIndex: 'follows',
			key: 'follows',
			width: '10%',
		},
		{
			title: '发布者',
			dataIndex: 'publisher',
			key: 'publisher',
			width: '20%',
		},
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '20%',
        }
      ]
    }
  },
  computed: {
    ...mapState({
      topicsInfo: state => state.topics.topicsInfo
    })
  },
  methods: {
    getTopicsInfo () {
      const that = this
      this.$store.dispatch('GET_TOPICS').then(() => {
      })
			.catch(() => {
			that.$message.error('加载已通过话题列表失败')
			})
    },
    routeToTopic (topicId) {
      this.$router.push('/asr-user-auth/' + topicId)
    }
  },
  mounted () {
    this.getTopicsInfo()
  }
}
</script>

<style scoped>

</style>