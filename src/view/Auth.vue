<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
				<Header :is-back="true" back-comments="返回用户列表"></Header>
				<div v-if="loaded">
					<a-page-header>
						<a-card class="mb-3">
							<a-descriptions title="权限信息">
								<a-descriptions-item label="用户ID">{{ authInfo.id }}</a-descriptions-item>
								<a-descriptions-item label="用户昵称">{{ authInfo.name }}</a-descriptions-item>
								<a-descriptions-item label="发布委托权限">{{ authInfo.releaseCommission == "1" ? "√" : "×"}}</a-descriptions-item>
								<a-descriptions-item label="接取委托权限">{{ authInfo.acceptCommission == "1" ? "√" : "×"}}</a-descriptions-item>
								<a-descriptions-item label="发布话题权限">{{ authInfo.releaseTopic == "1" ? "√" : "×"}}</a-descriptions-item>
								<a-descriptions-item label="发布评论权限">{{ authInfo.releaseComment == "1" ? "√" : "×"}}</a-descriptions-item>
							</a-descriptions>
						</a-card>
						<a-card class="mb-3">
							<a-descriptions title="用户头像"></a-descriptions>
							<div class="flex flex-row flex-wrap" v-if="authInfo.hasPhoto">
								<div class="w-1/3 px-2">
									<div class="h-72 bg-gray-100 border">
										<img class="object-contain w-full h-full" :src="authInfo.avatarUrl"  alt=" "/>
									</div>
								</div>
							</div>
							<p v-else>无</p>
						</a-card>
						<a-card class='mb-3'>
							<a-checkbox :checked="auth1" @change = "change1">修改委托发布权限</a-checkbox>
							<a-checkbox :checked="auth2" @change = "change2">修改委托接取权限</a-checkbox>
							<a-checkbox :checked="auth3" @change = "change3">修改话题发布权限</a-checkbox>
							<a-checkbox :checked="auth4" @change = "change4">修改评论发布权限</a-checkbox>

						</a-card>
						
						<div class="w-full h-16">
							<div class="w-1/2 h-full space-x-4">
								<button
									class="w-1/5 h-full text-lg ant-btn-danger focus:border-0"
									@click="notPassCheck(authInfo.id)"
								>修改</button>
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
	name: "Auth",
	components: {
		Navbar,
		Header
	},
	data () {
		return {
			loaded: false,
			rejectReason: '',
			spinning: false,
			auth1: false,
			auth2: false,
			auth3: false,
			auth4: false,
		}
	},
	computed: {
		...mapState({
			authInfo: state => state.auth.authInfo,
		})
	},
	methods: {
		onClickBack () {
			this.$router.back()
		},
		getInfo () {
			this.loaded = false
			const that = this
			this.$store.dispatch('GET_AUTH', {
				userId: that.$route.params.userId
			}).catch(() => {
				that.$message.error('加载用户权限信息失败')
			}).then(() => {
				that.loaded = true
				console.log(that.authInfo)
			})
		},
		change1() {
			this.auth1 = !this.auth1
		},
		change2() {
			this.auth2 = !this.auth2
		},
		change3() {
			this.auth3 = !this.auth3
		},
		change4() {
			this.auth4 = !this.auth4
		},
		notPassCheck (userId) {
			let bit  =  this.authInfo.releaseTopic + this.authInfo.releaseComment + this.authInfo.releaseCommission + this.authInfo.acceptCommission
			const replaceStr1 = (str, index, char) => {
				const strAry = str.split('');
				strAry[index] = char;
				return strAry.join('');
			}
			if (this.auth1) {
				let tmp = bit[0]
				if (tmp == "1") {
					bit = replaceStr1(bit, 0, "0")
				} else {
					bit = replaceStr1(bit, 0, "1")
				}
			}
			if (this.auth2) {
				let tmp = bit[1]
				if (tmp == "1") {
					bit = replaceStr1(bit, 1, "0")
				} else {
					bit = replaceStr1(bit, 1, "1")
				}
			}
			if (this.auth3) {
				let tmp = bit[2]
				if (tmp == "1") {
					bit = replaceStr1(bit, 2, "0")
				} else {
					bit = replaceStr1(bit, 2, "1")
				}
			}
			if (this.auth4) {
				let tmp = bit[3]
				if (tmp == "1") {
					bit = replaceStr1(bit, 3, "0")
				} else {
					bit = replaceStr1(bit, 3, "1")
				}
			}
			console.log(this.auth2)
			console.log(bit)
			const that = this
			this.$confirm({
				title: '确定修改该用户的权限吗？',
				okText: '确定',
				okType: 'info',
				cancelText: '取消',
				onOk () {
					that.spinning = true
					that.$store.dispatch('CHANGE_AUTH', {
						userId: userId,
						bit: bit
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
