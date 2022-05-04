<template>
	<div class="h-full">
		<a-menu
			mode="inline"
			theme="dark"
			:selected-keys=current
			:open-keys="currentOpen"
			@click="handleClick"
			class="h-full"
			title="活动发布与社交平台"
		>
			<a-menu-item key="0" class="test-center">
				<p class="text-lg text-right inline-block align-middle" style="color: white">活动发布与社交平台</p>
			</a-menu-item>
			
			<a-sub-menu key="1" @titleClick="titleClick">
				<span slot="title"><a-icon type="profile" /><span>活动管理</span></span>
				<a-menu-item key="2">待审核活动</a-menu-item>
				<a-menu-item key="3">已通过活动</a-menu-item>
			</a-sub-menu>
			
			<a-sub-menu key="8" @titleClick="titleClick">
				<span slot="title"><a-icon type="carry-out" /><span>委托管理</span></span>
				<a-menu-item key="9">审核委托</a-menu-item>
        <a-menu-item key="13">管理类别</a-menu-item>
			</a-sub-menu>
			
			<a-sub-menu key="11" @titleClick="titleClick">
				<span slot="title"><a-icon type="aliwangwang" /><span>话题管理</span></span>
				<a-menu-item key="12">审核话题</a-menu-item>
        <a-menu-item key="14">管理类别</a-menu-item>
			</a-sub-menu>
			
			<a-sub-menu key="4" @titleClick="titleClick">
				<span slot="title"><a-icon type="user" /><span>用户管理</span></span>
				<a-menu-item key="5">待审核用户</a-menu-item>
				<a-menu-item key="6">用户反馈</a-menu-item>
				<a-menu-item key="7">所有用户</a-menu-item>
			</a-sub-menu>
			
		</a-menu>
	</div>
</template>

<script>
export default {
	name: "Navbar",
	props: {
		defaultSelectedKey: {
			type: String,
			default: '1'
		},
	},
	data() {
		return {
			current: [/*'2','3','5','6','7','9','12','13', '14'*/],
			theme: 'dark',
			routes: {
				'2': '/asr-activity/checking',
				'3': '/asr-activity/active',
				'5': '/asr-user-manage/certification',
				'6': '/asr-feedbacks',
				'7': '/asr-user-manage/users',
				'9': '/asr-commission/applied/commission',
				'12': '/asr-topic/topics',
				'13': '/asr-commission/type/commission'
			},
			currentOpen : ['1', '4', '8', '11'],
		};
	},
	methods: {
		handleClick(e) {
			if (e.key !== '0') {
				this.current = e.key
				this.$router.push(this.routes[e.key])
			} else {
				this.current = '1'
				// this.currentOpen = []
			}
		},
		titleClick() {
			// if (this.currentOpen.indexOf(e.key) !== -1) {
			// 	this.currentOpen = []
			// } else {
			// 	this.currentOpen = [e.key]
			// }
		}
	},
}
</script>

<style scoped>

</style>