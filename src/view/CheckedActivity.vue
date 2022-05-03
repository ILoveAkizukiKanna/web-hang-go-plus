<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
				<Header :is-back="true" back-comments="返回已通过活动列表"></Header>
				<div v-if="loaded">
					<a-page-header>
<!--						<div class="text-4xl flex-grow mb-6 text-gray-700"></div>-->
						<a-card class="mb-3">
							<a-descriptions title="基本信息">
								<a-descriptions-item label="活动名称">{{ activityInfo.name }}</a-descriptions-item>
								<a-descriptions-item label="活动地点">{{ activityInfo.location }}</a-descriptions-item>
								<a-descriptions-item label="校区">{{ activityInfo.campus }}</a-descriptions-item>
								<a-descriptions-item label="报名开始时间">{{ activityInfo.signUpStartTime }}</a-descriptions-item>
								<a-descriptions-item label="报名截止时间">{{ activityInfo.signUpStopTime }}</a-descriptions-item>
								<a-descriptions-item label="最大活动人数">{{ activityInfo.capacity }}</a-descriptions-item>
								<a-descriptions-item label="活动开始时间">{{ activityInfo.startTime }}</a-descriptions-item>
								<a-descriptions-item label="活动结束时间">{{ activityInfo.stopTime }}</a-descriptions-item>
								<a-descriptions-item label="活动类别">{{ activityInfo.type }}</a-descriptions-item>
							</a-descriptions>
						</a-card>
						<a-card class="mb-3">
							<a-descriptions title="描述">
								<a-descriptions-item>{{ activityInfo.description }}</a-descriptions-item>
							</a-descriptions>
						</a-card>
						<a-card class="mb-3">
							<a-descriptions title="图片"></a-descriptions>
							<div class="flex flex-row flex-wrap" v-if="activityInfo.hasPhoto">
								<div class="w-1/3 px-2">
									<div class="h-72 bg-gray-100 border">
										<img class="object-contain w-full h-full" :src="activityInfo.photo"  alt=" "/>
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
	name: "CheckedActivity",
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
			activityInfo: state => state.checkedActivity.checkedActivityInfo,
			comments: state => state.checkedActivity.comments
		})
	},
	methods: {
		onClickBack () {
			this.$router.back()
		},
		getInfo () {
			this.loaded = false
			const that = this
			this.$store.dispatch('GET_CHECKED_ACTIVITY', {
				activityId: that.$route.params.activityId
			}).catch(() => {
				that.$message.error('加载活动详细信息失败')
				// console.log(err)
			}).then(() => {
				that.$store.dispatch('GET_COMMENTS', {
					activityId: that.$route.params.activityId
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
			// console.log(commentId)
			this.$confirm({
				title: '确认删除该条评论吗？',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk () {
					that.$store.dispatch('DELETE_COMMENT', {
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
	mounted () {
		this.getInfo()
	}
}
</script>

<style scoped>

</style>