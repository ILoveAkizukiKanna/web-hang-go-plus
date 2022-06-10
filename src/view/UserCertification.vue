<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto" default-selected-key="11"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
				<Header></Header>
				<div style="margin: 24px">
					<a-table :columns="columns" :data-source="userInfo"
                   rowKey="userId"
                   class="w-auto"
          >
						<span slot="customTitle"><a-icon type="smile-o" /> Name</span>
						<span slot="action" slot-scope="text, record">
                            <a style="color: #00A0E9" @click="viewCertifiedPhotos(record.userPictureUrl)">点击查看认证图片</a>
                            <a-divider type="vertical" />
                            <a style="color: #00A0E9" @click="passCertification(record.userId)">通过认证</a>
							<a-divider type="vertical" />
                            <a style="color: #00A0E9" @click="notPassCertification(record.userId)">不通过认证</a>
                        </span>
					</a-table>
					<a-modal
						title="认证照片"
						:visible="visibleImg"
						:footer="null"
						@cancel="imgCancel"
					>
						<div>
							<img :src="src" alt="找不到图像" style="width: 470px"/>
						</div>
					</a-modal>
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
	name: "UserCertification",
	components: {
		Navbar,
		Header
	},
	data () {
		return {
			columns: [
				{
					dataIndex: 'userName',
					key: 'userName',
					slots: { title: 'customTitle' },
					scopedSlots: { customRender: 'userName' },
          width: "15%",
				},
				{
					title: '邮箱',
					dataIndex: 'userEmail',
					key: 'userEmail',
          width: "15%",
				},
				{
					title: '学号',
					dataIndex: 'userStudentId',
					key: 'userStudentId',
          width: "15%",
				},
				{
					title: '电话号码',
					dataIndex: 'userPhone',
					key: 'userPhone',
          width: "15%",
				},
				{
					title: '操作',
					key: 'action',
					scopedSlots: { customRender: 'action' },
          width: "40%",
				}
			],
			visibleImg: false,
			src: ''
		}
	},
	computed: {
		...mapState({
			userInfo: state => state.userCertification.userInfo
		})
	},
	methods: {
		getUserInfo () {
			const that = this
			this.$store.dispatch('GET_USER_INFO')
				.catch(() => {
					// console.log(err)
					that.$message.error('加载用户认证信息失败')
				})
		},
		viewCertifiedPhotos (url) {
			// console.log(url)
			this.src = url
			this.visibleImg = true
			// console.log(this.userInfo)
		},
		imgCancel () {
			this.visibleImg = false
		},
		passCertification (id) {
			const that = this
			this.$confirm({
				title: '确定通过该用户的认证吗？',
				okText: '确定',
				okType: 'info',
				cancelText: '取消',
				onOk () {
					that.$store.dispatch('PASS_CERTIFICATION', {
						userId: id
					}).then((data) => {
						if (data) {
							that.$message.success('操作成功')
						}
					}).catch(() => {
						that.$message.error('操作失败')
					}).finally(() => {
						that.getUserInfo()
					})
				}
			})
		},
		notPassCertification (id) {
			const that = this
			this.$confirm({
				title: '确定不通过该用户的认证吗？',
				okText: '确定',
				okType: 'danger',
				cancelText: '取消',
				onOk () {
					that.$store.dispatch('NOT_PASS_CERTIFICATION', {
						userId: id
					}).then((data) => {
						if (data) {
							that.$message.success('操作成功')
						}
					}).catch(() => {
						that.$message.error('操作失败')
					}).finally(() => {
						that.getUserInfo()
					})
				}
			})
		}
	},
	mounted () {
		this.getUserInfo()
		// console.log(this.userInfo)
	}
}
</script>

<style scoped>
</style>