<template>
  <div>
    <h2>分类</h2>
      <back-top v-show="isShowBackTop" @click.native="backTop"/>
  </div>
</template>

<script>
  import {backTopMixin} from 'common/mixin'

  export default {
    name: "Category",
    mixins: [backTopMixin]
 
  }
</script>

<style scoped>
  
</style>
