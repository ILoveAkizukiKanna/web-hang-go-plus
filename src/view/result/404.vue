<template>
  <a-result status="404" title="404" sub-title="你访问的页面似乎不见了。">
    <template #extra>
      <a-button type="primary" v-on:click="back">
        返回
      </a-button>
    </template>
  </a-result>
</template>

<script>
export default {
  name: '404',
  methods: {
    back() {
      this.$router.go(-1)
    }
  },
}
</script>

<style scoped>

</style>