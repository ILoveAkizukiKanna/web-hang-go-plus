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
								<a-descriptions-item label="委托类别">{{ commissionInfo.type }}</a-descriptions-item>
							</a-descriptions>
						</a-card>
						<a-card class="mb-3">
							<a-descriptions title="描述">
								<a-descriptions-item>{{ commissionInfo.description }}</a-descriptions-item>
							</a-descriptions>
						</a-card>
						<a-card class='mb-3'>
							<a-descriptions title="驳回理由 (不超过100个字)">
							</a-descriptions>
							<a-textarea placeholder="若驳回委托申请，请在这里输入驳回理由"
							:autoSize="true"
							:maxLength="100"
							v-model="rejectReason"/>
						</a-card>
						
						<div class="w-full h-16">
							<div class="w-1/2 h-full space-x-4">
								<button
									class="w-1/5 h-full text-lg ant-btn-danger focus:border-0"
									@click="notPassCheck(commissionInfo.id)"
								>驳 回</button>
								<a-spin size="large" :spinning="spinning" />
							</div>
						</div>
						
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
			loaded: false,
			rejectReason: '',
			spinning: false
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
				
			}).then(() => {
				that.$store.dispatch('GET_CCOMMENTS', {
					commissionId: that.$route.params.commissionId
				}).catch(() => {
					that.$message.error('加载评论信息失败')
					
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
		},
		notPassCheck (commissionId) {
			if (this.rejectReason === '') {
				this.$message.error('请输入驳回理由！')
				return
			}
			const that = this
			this.$confirm({
				title: '确定下线该委托吗？',
				okText: '确定',
				okType: 'info',
				cancelText: '取消',
				onOk () {
					that.spinning = true
					that.$store.dispatch('NOT_PASS_CHECK_COMMISSION', {
						commissionId: commissionId,
						reason: that.rejectReason
					}).then(data => {
						if (data) {
							that.spinning = false
							that.$message.success('操作成功')
							that.$router.back()
						}
					}).catch(() => {
						// console.log(err)
			that.spinning = false
			that.$message.error('操作失败，该委托可能已经被处理，请返回委托列表确认。')
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