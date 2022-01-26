<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick" >
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item" 
        :class="{active : index===currentIndex}" @click="titleClick(index)">
        {{item}}</div>
      </div> 
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue';

export default {
  name:"DetailNavBar",
  components: {
    NavBar
  },
  data () {
    return  {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  methods: {
    titleClick(index) {
       this.currentIndex=index;
    },
    backClick () {
      // 回到前一个页面
      this.$router.back();
    }
  }
}
</script>

<style>
.title {
  /* 这个可以将内容改为横向分布 */
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
/* 文字点击后改变颜色 */
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>