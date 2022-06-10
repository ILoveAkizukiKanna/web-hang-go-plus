<template>
	<div class="h-full">
		<a-menu
			mode="inline"
			theme="dark"
			:selected-keys="[current]"
			:open-keys="currentOpen"
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
			
			<a-sub-menu key="4" @titleClick="titleClick">
				<span slot="title"><a-icon type="carry-out" /><span>委托管理</span></span>
				<a-menu-item key="5">审核委托</a-menu-item>
				<a-menu-item key="6">管理类别</a-menu-item>
			</a-sub-menu>
			
			<a-sub-menu key="7" @titleClick="titleClick">
				<span slot="title"><a-icon type="aliwangwang" /><span>话题管理</span></span>
				<a-menu-item key="8">审核话题</a-menu-item>
				<a-menu-item key="9">管理类别</a-menu-item>
			</a-sub-menu>
			
			<a-sub-menu key="10" @titleClick="titleClick">
				<span slot="title"><a-icon type="user" /><span>用户管理</span></span>
				<a-menu-item key="11">待审核用户</a-menu-item>
				<a-menu-item key="12">用户反馈</a-menu-item>
				<a-menu-item key="13">所有用户</a-menu-item>
        <a-menu-item key="14">举报审核</a-menu-item>
        <a-menu-item key="15">申诉审核</a-menu-item>
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
    }
	},
	data() {

		return {
      current: this.defaultSelectedKey,
      currentOpen: this.defaultSelectedKey === '1' ? [] : [(parseInt(this.defaultSelectedKey) > 10) ? '10' :
                                                           (parseInt(this.defaultSelectedKey) > 7) ? '7' :
                                                           (parseInt(this.defaultSelectedKey) > 4) ? '4' :'1'],
      theme: 'dark',
      routes: {
        '2': '/asr-activity/checking',
        '3': '/asr-activity/active',
        '5': '/asr-commission/applied/commission',
        '6': '/asr-commission/type/commissions',
        '8': '/asr-topic/topics',
        '9': '/asr-topic/type/topics',
        '11': '/asr-user-manage/certification',
        '12': '/asr-feedbacks',
        '13': '/asr-user-manage/users',
        '14': '/asr-user-manage/complaints',
        '15': '/asr-user-manage/appeal'
      },
		};
	},
	methods: {
		handleClick(e) {
      if (e.key !== '0') {
        // console.log(e);
        this.current = e.key;
        this.$router.push(this.routes[e.key])
      } else {
        this.current = '1'
        this.currentOpen = []
      }
		},
		titleClick(e) {
      if (this.currentOpen.indexOf(e.key) !== -1) {
        this.currentOpen = []
      } else {
        this.currentOpen = [e.key]
      }
		}
	},
}
</script>

<style scoped>
</style>