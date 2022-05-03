<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
				<Header :is-back="true" back-comments="返回已通过委托列表"></Header>
				<div v-if="loaded">
					<a-page-header>
<!--						<div class="text-4xl flex-grow mb-6 text-gray-700"></div>-->
						<a-card class="mb-3">
							<a-descriptions title="基本信息">
								<a-descriptions-item label="委托名称">{{ commissionInfo.name }}</a-descriptions-item>
								<a-descriptions-item label="是否实时">{{ commissionInfo.isReal }}</a-descriptions-item>
								<a-descriptions-item label="开始时间">{{ commissionInfo.startTime }}</a-descriptions-item>
								<a-descriptions-item label="截止时间">{{ commissionInfo.stopTime }}</a-descriptions-item>
								<a-descriptions-item label="活动类别">{{ commissionInfo.type }}</a-descriptions-item>
							</a-descriptions>
						</a-card>
						<a-card class="mb-3">
							<a-descriptions title="描述">
								<a-descriptions-item>{{ commissionInfo.description }}</a-descriptions-item>
							</a-descriptions>
						</a-card>
						<a-card class="mb-3">
							<a-descriptions title="图片"></a-descriptions>
							<div class="flex flex-row flex-wrap" v-if="commissionInfo.hasPhoto">
								<div class="w-1/3 px-2">
									<div class="h-72 bg-gray-100 border">
										<img class="object-contain w-full h-full" :src="commissionInfo.photo"  alt=" "/>
									</div>
								</div>
							</div>
							<p v-else>无</p>
						</a-card>
						<a-card title="用户评论">
							<a-list item-layout="horizontal" :data-source="comments" :header="`${comments.length} 条评论`">
								<a-list-item slot="renderItem" slot-scope="item">
									<a slot="actions" style="color: #1890ff" @click="deleteComment(item.commentId)">删除</a>
									<a-list-item-meta
										:description="item.datetime"
									>
										<a slot="title">{{ item.author }}</a>
										<a-avatar
											slot="avatar"
											:src="item.avatar"
										/>
									</a-list-item-meta>
									{{ item.content }}
								</a-list-item>
							</a-list>
						</a-card>
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
	name: "Acommission",
	components: {
		Navbar,
		Header
	},
	data () {
		return {
			loaded: false
		}
	},
	computed: {
		...mapState({
			commissionInfo: state => state.acommission.commissionInfo,
			comments: state => state.acommission.comments
		})
	},
	methods: {
		onClickBack () {
			this.$router.back()
		},
		getInfo () {
			this.loaded = false
			const that = this
			this.$store.dispatch('GET_APPLIED_ACOMMISSION', {
				commissionId: that.$route.params.commissionId
			}).catch(() => {
				that.$message.error('加载委托详细信息失败')
				// console.log(err)
			}).then(() => {
				that.$store.dispatch('GET_CCOMMENTS', {
					commissionId: that.$route.params.commissionId
				}).catch(() => {
					that.$message.error('加载评论信息失败')
					// console.log(err)
				}).then(() => {
					that.loaded = true
				})
			})
		},
		deleteComment (commentId) {
			const that = this
			this.$confirm({
				title: '确认删除该条评论吗？',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk () {
					that.$store.dispatch('DELETE_CCOMMENT', {
						commentId: commentId
					}).then((data) => {
						if (data) {
							that.$message.success('操作成功')
							that.getInfo()
						}
					}).catch(() => {
						that.$message.error('操作失败')
					})
				}
			})
		}
	},
	mounted() {
		this.getInfo()
	}
}
</script>

<style scoped>

</style>