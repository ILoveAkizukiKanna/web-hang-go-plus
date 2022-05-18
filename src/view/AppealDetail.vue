<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
				<Header :is-back="true" back-comments="返回申诉列表"></Header>
				<div v-if="loaded">
					<a-page-header>
						<a-card class="mb-3">
							<a-descriptions title="用户申诉信息">
								<a-descriptions-item label="用户ID">{{ appealDetail.id }}</a-descriptions-item>
								<a-descriptions-item label="用户昵称">{{ appealDetail.nickName }}</a-descriptions-item>
								<a-descriptions-item label="申诉原因">{{ appealDetail.reason}}</a-descriptions-item>
								<a-descriptions-item label="申请权限">{{ appealDetail.auth}}</a-descriptions-item>
							</a-descriptions>
						</a-card>
						<a-card class="mb-3">
							<a-descriptions title="用户头像"></a-descriptions>
							<div class="flex flex-row flex-wrap" v-if="appealDetail.hasPhoto">
								<div class="w-1/3 px-2">
									<div class="h-72 bg-gray-100 border">
										<img class="object-contain w-full h-full" :src="appealDetail.avatarUrl"  alt=" "/>
									</div>
								</div>
							</div>
							<p v-else>无</p>
						</a-card>
						
						<a-card class='mb-3'>
							<a-descriptions title="驳回理由 (不超过100个字)">
							</a-descriptions>
							<a-textarea placeholder="若驳回申诉，请在这里输入驳回理由"
							:autoSize="true"
							:maxLength="100"
							v-model="rejectReason"/>
						</a-card>
						
						<div class="w-full h-16">
							<div class="w-1/2 h-full space-x-4">
								<button
									class="w-1/5 h-full text-lg ant-btn-danger focus:border-0"
									@click="notPassCheck(appealDetail.id)"
								>驳回</button>
								<a-spin size="large" :spinning="spinning" />
								<button
									class="w-1/5 h-full text-lg ant-btn-danger focus:border-0"
									@click="PassCheck(appealDetail.id)"
								>通过</button>
								<a-spin size="large" :spinning="spinning" />
							</div>
						</div>
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
	name: "AppealDetail",
	components: {
		Navbar,
		Header
	},
	data () {
		return {
			loaded: false,
			rejectReason: '',
			spinning: false,
		}
	},
	computed: {
		...mapState({
			appealDetail: state => state.appealDetail.appealDetail,
		})
	},
	methods: {
		onClickBack () {
			this.$router.back()
		},
		getInfo () {
			this.loaded = false
			const that = this
			this.$store.dispatch('GET_APPEAL_DETAIL', {
				appealId: that.$route.params.appealId
			}).catch(() => {
				that.$message.error('加载申诉信息失败')
				
			}).then(() => {
				that.loaded = true
			})
		},
		notPassCheck (appealId) {
			const that = this
			if (this.rejectReason === '') {
				this.$message.error('请输入驳回理由！')
				return
			}
			this.$confirm({
				title: '确定驳回该申诉吗？',
				okText: '确定',
				okType: 'info',
				cancelText: '取消',
				onOk () {
					that.spinning = true
					that.$store.dispatch('NOT_PASS_APPEAL', {
						appealId: appealId,
						reason: that.rejectReason
					}).then(data => {
						if (data) {
							that.spinning = false
							that.$message.success('操作成功')
							that.$router.back()
						}
					}).catch(() => {
						that.spinning = false
						that.$message.error('操作失败')
					})
				}
			})
		},
		PassCheck (appealId) {
			const that = this
			this.$confirm({
				title: '确定恢复该用户的权限吗？',
				okText: '确定',
				okType: 'info',
				cancelText: '取消',
				onOk () {
					that.spinning = true
					that.$store.dispatch('PASS_APPEAL', {
						appealId: appealId,
					}).then(data => {
						if (data) {
							that.spinning = false
							that.$message.success('操作成功')
							that.$router.back()
						}
					}).catch(() => {
						that.spinning = false
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
