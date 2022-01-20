<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"  
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>
        <!-- 导入本周流行 -->
        <feature-view></feature-view>
        <tab-control class="tab-control" 
                  :title="['流行','新款','精选']" 
                  @tabClick="tabClick"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
    </scroll>

   <back-top @click.native="backClick" v-show="isShowBackTop" /><!--在这里调用：this.$emit('backClick'):BackTop.vue-->
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  // 引入本周流行
  import FeatureView from './childComps/FeatureView.vue';

  //公共组件
  //引入头部导航
  import NavBar from 'components/common/navbar/NavBar';
  //引入tabControl
  import TabControl from 'components/content/tabControl/TabControl';
  import GoodsList from 'components/content/goods/GoodsList';
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop.vue';

  import {getHomeMultidata,getHomeGoods} from "network/home";

 

  

  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,//注册本周流行
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
     data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType:'pop',
        isShowBackTop:false
      }
    },
    computed: {
      showGoods() {
        return  this.goods[this.currentType].list; //计算属性
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata(); //调用下面的getHomeMultidata

      // 2.请求商品数据
      this.getHomeGoods('pop');//调用下面的getHomeGoods
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods:{
      /** 
      事件监听的方法
      */
      tabClick(index) {
       switch(index) {
         case 0:
           this.currentType='pop';
           break;
         case 1:
           this.currentType='new';
         break;
         case 2:
           this.currentType='sell';
         break;
       }
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      // 监听屏幕滚动的位置
      contentScroll(position) {
        this.isShowBackTop=(-position.y)>1000
      },
      // 监听上拉加载更多
      loadMore() {
       this.getHomeGoods(this.currentType);
      },
      /** 
        网络请求相关的方法
      */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
      },
      getHomeGoods(type) {
        const page=this.goods[type].page+1;//goods上面的对象goods，type是上面的pop,news,sell之类的
        getHomeGoods(type,page).then(res=>{
          // console.log(res);
        this.goods[type].list.push(...res.data.list) //把res.data.list里面的数据塞到goods[type].list里面去
        this.goods[type].page+=1;

        this.$refs.scroll.finishPullUp();
      })
      }
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    /* vh-->viewport height */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  /* .content { 
    position: absolute;

    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
   } */

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px; 
  }

</style>
