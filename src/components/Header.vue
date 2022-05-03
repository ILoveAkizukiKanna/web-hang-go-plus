<template>
	<div>
		<div class="ant-pro-global-header">
			<div v-if="isBack" class="ant-pro-global-header-trigger text-base" @click="onClickBack()">
				<a-icon type="caret-left" />{{backComments}}
			</div>
			<div class="ant-pro-global-header-index-right">
				<div class="ant-pro-global-header-index-action text-base">
					<div style="margin-top: 20px" @click="logout">
						<a-icon type="logout" style="margin-right: 5px" />注销
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Header",
	props: {
		isBack: {
			type: Boolean,
			default: false
		},
		backComments: {
			type: String,
			default: ''
		}
	},
	methods: {
		onClickBack () {
			this.$router.back()
		},
		logout() {
			this.$store.dispatch('LOGOUT').then(() => {
				this.$router.push('/login')
			})
		}
	}
}
</script>

<style scoped>
.ant-pro-global-header {
	position: relative;
	height: 64px;
	padding: 0;
	background: #fff;
	-webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.ant-pro-global-header-index-right {
	margin-right: 8px;
}
.ant-pro-global-header-index-right {
	float: right;
	height: 100%;
	margin-left: auto;
	overflow: hidden;
}
.ant-pro-global-header-index-right .ant-pro-global-header-index-action {
	display: inline-block;
	height: 100%;
	padding: 0 12px;
	cursor: pointer;
	-webkit-transition: all 0.3s;
	transition: all 0.3s;
}
.text-base {
	font-size: 1rem;
	line-height: 1.5rem;
}
.ant-pro-global-header .ant-pro-global-header-index-action i {
	color: rgba(0, 0, 0, 0.65);
	vertical-align: middle;
}
.pr-2 {
	padding-right: 0.5rem;
}
.anticon {
	display: inline-block;
	color: inherit;
	font-style: normal;
	line-height: 0;
	text-align: center;
	text-transform: none;
	vertical-align: -0.125em;
	text-rendering: optimizeLegibility;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
.ant-pro-global-header-trigger {
	height: 64px;
	line-height: 64px;
	vertical-align: top;
	padding: 0 22px;
	display: inline-block;
	cursor: pointer;
	-webkit-transition: all 0.3s, padding 0s;
	transition: all 0.3s, padding 0s;
}
</style>