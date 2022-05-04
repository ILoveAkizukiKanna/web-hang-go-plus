<template>
  <div class="h-full">
    <a-row class="h-full">
      <a-col span="3" class="h-full" style="width: 250px">
        <Navbar class="w-auto" default-selected-key="3"></Navbar>
      </a-col>
      <a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 250px" class="h-full">
        <Header></Header>
		<div style="margin-left: 20px; margin-top: 20px;">
			<div class="w-full h-8">
				<div class="w-1/2 h-full space-x-4">
					<button
						class="w-1/5 h-full text-lg ant-btn-primary focus:border-0"
						@click="addNew()"
					>增加新分类</button>
				</div>
			</div>
		</div>
        <div style="margin: 24px">
          <a-table :columns="columns" :data-source="typeTopicInfo"
                   class="w-auto">
            <span slot="typeTitle"><a-icon type="carry-out" />类别名称</span>
            <span slot="action" slot-scope="text, record">
          <a style="color: #00A0E9" @click="routeToType(record.typeId)">查看类别详情</a>
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
  name: "TypeTopic",
  components: {
    Navbar,
    Header
  },
  data () {
    return {
      columns: [
        {
          dataIndex: 'typeName',
          key: 'typeName',
          slots: { title: 'typeTitle' },
          width: '50%',
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' },
          width: '50%',
        }
      ]
    }
  },
  computed: {
    ...mapState({
      typeTopicInfo: state => state.typeTopic.typeTopicInfo
    })
  },
  methods: {
    getTypeTopicInfo () {
      const that = this
      this.$store.dispatch('GET_TYPE_TOPIC').then(() => {
      })
          .catch(() => {
            that.$message.error('加载类别列表失败')
          })
    },
    routeToType (typeId) {
      //TODO
      this.$router.push('/asr-topic/type/topic/detail/' + typeId)
    }
  },
  mounted () {
    this.getTypeTopicInfo()
  }
}
</script>

<style scoped>

</style>