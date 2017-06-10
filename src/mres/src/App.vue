<template>
  <div id="app">
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <router-link :to="{name: 'HomePage'}">
          <span class="brand">
            <img src="img/logo.png" class="logo">  Dr Chain
          </span>
        </router-link>
      </el-menu-item>
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
.logo {
  height: 40px;
}

.el-menu-item.is-active {
  color: #FFF;
}

.brand {
  font-size: 1.5em;
}
</style>
