<template>
 <div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
   <home-swiper :banners="banners"></home-swiper>
   <recommend-view :recommends="recommends"></recommend-view>
 </div>
</template>

<script>
// 引入我们的NavBar
import NavBar from 'components/common/navbar/NavBar';
// 引入我们的的轮播图文件swiper
// import {Swiper,SwiperItem} from 'components/common/swiper'; // 改下面的
import HomeSwiper from './childComps/HomeSwiper.vue'
// 引入首页推荐
import RecommendView from './childComps/RecommendView.vue';

// 引入home.js然后使用getHomeMultidata方法
import {getHomeMultidata} from"network/home";

  export default {
    name: "Home",
    components: { 
      NavBar,
      HomeSwiper,
      RecommendView
    },
    data() {
     return {
        banners:[],
        recommends:[]
      }
    },
    create() {
      // 1.请求多个数据
      getHomeMultidata().then(res=>{
        // console.log(res);
        // this.result=res;
        this.banners=res.data.banner;
        this.recommends=res.data.recommend;
      })
    }
  
  }
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: var(--color-background);
}
</style>
