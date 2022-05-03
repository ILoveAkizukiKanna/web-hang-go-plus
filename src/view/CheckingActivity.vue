<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
				<Header :is-back="true" back-comments="返回待审核活动列表"></Header>
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
										<img class="object-contain w-full h-full" :src="activityInfo.photo"  alt=""/>
									</div>
								</div>
							</div>
							<p v-else>无</p>
						</a-card>
						<a-card class='mb-3'>
							<a-descriptions title="驳回理由 (不超过100个字)">
							</a-descriptions>
							<a-textarea placeholder="若驳回活动申请，请在这里输入驳回理由"
                          :autoSize="true"
                          :maxLength="100"
                          v-model="rejectReason"/>
						</a-card>

						<div class="w-full h-16">
							<div class="w-1/2 h-full space-x-4">
								<button
									class="w-1/5 h-full text-lg bg-green-500 hover:bg-green-300
          text-white hover:text-white hover:border-green-800 focus:bg-green-500 focus:text-white focus:border-0"
									@click="passCheck(activityInfo.id)"
								>通 过</button>
								<button
									class="w-1/5 h-full text-lg ant-btn-danger focus:border-0"
									@click="notPassCheck(activityInfo.id)"
								>驳 回</button>
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

const baseUrl =
	'https://raw.githubusercontent.com/vueComponent/ant-design-vue/master/components/vc-slick/assets/img/react-slick/'

export default {
	name: "CheckingActivity",
	components: {
		Navbar,
		Header
	},
	data () {
		return {
			loaded: false,
			imgUrl: require('../assets/avatar2.jpg'),
			baseUrl,
			basketUrl: require('../assets/basketball.jpg'),
			activityContent: {
				name: '北航篮球赛',
				maintainer: '北京航空航天大学学生会',
				location: '学院路校区篮球场',
				campus: '学院路校区',
				signUpStartTime: '2021-04-29 14:00:00',
				signUpStopTime: '2021-05-05 00:00:00',
				startTime: '2021-05-05 17:00:00',
				stopTime: '2021-05-05 19:00:00',
				capacity: '400',
				description: '北航篮球赛一年一度的北航篮球赛一年一度的。\n我们怀揣热忱的灵魂天然被赋予对超越性的追求，不屑于古旧坐标的约束，钟情于在别处的芬芳。但当这种期望流于对过去观念不假思索的批判，乃至走向虚无与达达主义时，便值得警惕了。与秩序的落差、错位向来不能为越矩的行为张本。而纵然我们已有翔实的蓝图，仍不能自持已在浪潮之巅立下了自己的沉锚。\n '
			},
			rejectReason: '',
			spinning: false
		}
	},
	computed: {
		...mapState({
			activityInfo: state => state.checkingActivity.checkingActivityInfo
		})
	},
	methods: {
		getImgUrl (i) {
			return `${baseUrl}abstract0${i + 1}.jpg`
		},
		getCheckingActivityInfo () {
			const that = this
			this.$store.dispatch('GET_CHECKING_ACTIVITY', {
				activityId: that.$route.params.activityId
			}).catch(() => {
				// console.log(err)
				that.$message.error('加载活动详细信息失败')
			}).then(() => {
				that.loaded = true
			})
		},
		passCheck (id) {
			const that = this
			this.$confirm({
				title: '确定通过该活动申请的审核吗?',
				okText: '确定',
				okType: 'info',
				cancelText: '取消',
				onOk () {
          that.spinning = true
          that.$store.dispatch('PASS_CHECK', {
						activityId: id
					}).then(data => {
						if (data) {
							that.$message.success('操作成功')
							that.$router.back()
						}
					}).catch(() => {
						// console.log(err)
            that.spinning = false
						that.$message.error('操作失败，该活动发布请求可能已经被处理，请返回活动列表确认。')
					})
				}
			})
		},
		notPassCheck (id) {
			if (this.rejectReason === '') {
				this.$message.error('请输入驳回理由！')
				return
			}
			const that = this
			this.$confirm({
				title: '确定不通过该活动申请的审核吗?',
				okText: '确定',
				okType: 'info',
				cancelText: '取消',
				onOk () {
					that.spinning = true
					that.$store.dispatch('NOT_PASS_CHECK', {
						activityId: id,
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
            that.$message.error('操作失败，该活动发布请求可能已经被处理，请返回活动列表确认。')
					})
				}
			})
		}
	},
	mounted () {
		this.loaded = false
		this.getCheckingActivityInfo()
	}
}
</script>

<style scoped>
.ant-carousel >>> .slick-dots {
	height: auto;
}
.ant-carousel >>> .slick-slide img {
	border: 5px solid #fff;
	display: block;
	margin: auto;
	max-width: 80%;
}
.ant-carousel >>> .slick-thumb {
	bottom: -45px;
}
.ant-carousel >>> .slick-thumb li {
	width: 60px;
	height: 45px;
}
.ant-carousel >>> .slick-thumb li img {
	width: 100%;
	height: 100%;
	filter: grayscale(100%);
}
.ant-carousel >>> .slick-thumb li.slick-active img {
	filter: grayscale(0%);
}
</style>