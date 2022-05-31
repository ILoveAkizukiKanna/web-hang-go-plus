<template>
	<div class="h-full">
		<router-view v-if="isRouterAlive"></router-view>
	</div>
</template>

<script>

export default {
	name: 'App',
	components: {
	},
  provide() { //提供reload方法
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive : true
    }
  },
  methods:{ //刷新方法
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
  }
}
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
