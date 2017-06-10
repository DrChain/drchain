<template>
  <div id="app">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><span class="brand">Dr Chain</span></el-menu-item>
    </el-menu>
    <router-view id="main-content"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
  }
}
</script>

<style>
.el-menu-item.is-active {
  color: #FFF;
}
.brand {
  font-size: 1.5em;
}
</style>
