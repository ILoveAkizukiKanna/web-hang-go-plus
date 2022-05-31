<template>
	<div class="h-full">
		<a-menu
			mode="inline"
			theme="dark"
			:selected-keys="[myCurrent]"
			:open-keys="myOpen"
			@click="handleClick"
			class="h-full"
			title="北航便民生活平台"
		>
			<a-menu-item key="0" class="test-center">
				<p class="text-lg text-right inline-block align-middle" style="color: white">北航便民生活平台</p>
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
        <a-menu-item key="15">举报审核</a-menu-item>
        <a-menu-item key="16">申诉审核</a-menu-item>
			</a-sub-menu>
			
		</a-menu>
	</div>
</template>

<script>
export default {
	name: "Navbar",
	props: {
	},
	data() {
		this.current = '1'
		this.myMap = {
			'1': ['1'],
			'2': ['1'],
			'3': ['1'],
			'4': ['4'],
			'5': ['4'],
			'6': ['4'],
			'7': ['4'],
			'8': ['8'],
			'9': ['8'],
			'11': ['11'],
			'12': ['11'],
			'13': ['8'],
			'14': ['11'],
      '15': ['4'],
      '16': ['4'],
		}
		this.currentOpen = this.myMap[this.current]
		return {
			theme: 'dark',
			routes: {
				'2': '/asr-activity/checking',
				'3': '/asr-activity/active',
				'5': '/asr-user-manage/certification',
				'6': '/asr-feedbacks',
				'7': '/asr-user-manage/users',
				'9': '/asr-commission/applied/commission',
				'12': '/asr-topic/topics',
				'13': '/asr-commission/type/commissions',
				'14': '/asr-topic/type/topics',
        '15': '/asr-user-manage/complaints',
        '16': '/asr-user-manage/appeal'
			},
			myCurrent : this.current,
			myOpen: this.myOpen
		};
	},
	methods: {
		handleClick(e) {
			this.current = e.key;
			this.myCurrent = e.key;
			this.$router.push(this.routes[e.key])
			this.currentOpen = this.myMap[e.key]
			this.myOpen = this.myMap[e.key]
		},
		titleClick(e) {
			this.currentOpen = this.myMap[e.key]
			this.myOpen = this.myMap[e.key]
			console.log("myopen is ")
			console.log(this.myOpen)
		}
	},
}
</script>

<style scoped>
</style>