<template>
  <div id="app">
    <!-- 配置router -->
    <router-view></router-view>
    <!-- 配置tabbar -->
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
// 导入MainTabBar
  import MainTabBar from'components/content/mainTabbar/MainTabBar'

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";
</style>
