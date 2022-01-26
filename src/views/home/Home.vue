<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
     <tab-control :title="['流行','新款','精选']" 
                  @tabClick="tabClick" 
                  ref="tabControl1" class="tab-control" v-show="isTabFixed" ></tab-control>

    <scroll class="content"  
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true" 
            @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <!-- 导入本周流行 -->
        <feature-view></feature-view>
        <tab-control :title="['流行','新款','精选']" 
                  @tabClick="tabClick" ref="tabControl2"></tab-control>
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
  //导入防抖
  import {debounce} from "common/utils";
  import {itemListenerMixin} from "common/mixin"
  

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
    mixins:[itemListenerMixin],
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
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0,
      }
    },
    computed: {
      showGoods() {
        return  this.goods[this.currentType].list; //计算属性
      }
    },
    // 测试点击其他页面后首页会不会销毁
    destroyed() {
      console.log('home destroyed');
    },
    // 回到用户切换前的坐标
      activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    // 纪录用户滑动到的坐标
    deactivated() {
     this.saveY = this.$refs.scroll.scrollY
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata(); //调用下面的getHomeMultidata

      // 2.请求商品数据
      this.getHomeGoods('pop');//调用下面的getHomeGoods
      this.getHomeGoods('new');
      this.getHomeGoods('sell');


    },
    mounted() {

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
      //  设置切换换后商品同步，也就是下面的商品一致
      this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      // 监听屏幕滚动的位置
      contentScroll(position) {
       // 1.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 1000

        // 2.决定tabControl是否吸顶(position: fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 监听上拉加载更多
      loadMore() {
       this.getHomeGoods(this.currentType);
      // console.log('加载更多的方法');
      },
      swiperImageLoad() {
         this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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

        this.$refs.scroll.finishedPullUp(); //上拉加载更多
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
/*     
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

.tab-control {
  position: relative;   /* 可以实现在原来位置 */
  z-index: 9;
}

/*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/

</style>
