<template>
	<div class="h-full">
		<a-row class="h-full">
			<a-col span="3" class="h-full" style="width: 250px">
				<Navbar class="w-auto"></Navbar>
			</a-col>
			<a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
				<Header></Header>
        <div class="m-6 text-gray-700 text-base">欢迎使用管理员后台，请点击左侧导航栏项目进入管理界面。</div>
			</a-col>
		</a-row>
	</div>
</template>


<script>
import Navbar from "../components/Navbar";
import Header from "../components/Header";
export default {
	name: "Index",
	components: {
		Navbar,
		Header
	}
}
</script>

<style scoped>

</style>
