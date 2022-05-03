<template>
  <div class="h-full">
    <a-row class="h-full">
      <a-col span="3" class="h-full" style="width: 250px">
        <Navbar class="w-auto" default-selected-key="7"></Navbar>
      </a-col>
      <a-col style="background-color: #f0f2f5;overflow-y: auto;margin-left: 220px" class="h-full">
        <Header></Header>
        <div style="margin: 24px">
          <a-table :columns="columns"
                   :data-source="userList"
                   rowKey="id"
                   class="w-auto overflow-x-scroll"
          >
            <span slot="customTitle">用户id</span>
          </a-table>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout',
  props: {
    defaultSelectedKey: {
      type: String,
      default: '1'
    }
  },
}
</script>

<style scoped>

</style>