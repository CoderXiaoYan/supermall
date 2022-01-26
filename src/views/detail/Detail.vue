<template>
  <div id="detail">
    <scroll class="content" ref="scroll">
       <detail-nav-bar class="datail-nav"></detail-nav-bar>
       <detail-swiper :topImages="topImages" ></detail-swiper>
       <detail-base-info :goods="goods"></detail-base-info>
       <detail-shop-info :shop="shop"/>
       <detail-goods-info :detail-info="detailInfo"@imageLoad="imageLoad"></detail-goods-info>
       <detail-param-info :paramInfo="paramInfo"></detail-param-info>
       <!-- 跟上面的重复了二选一 -->
       <!-- <detail-params-info :param-info="itemParams"></detail-params-info> -->
       <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
       <goods-list :goods="recommends"></goods-list>
    </scroll>
    <h2>详情页: {{iid}}</h2>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue';
import DetailSwiper from './childComps/DetailSwiper.vue';
import DetailBaseInfo from './childComps/DetailBaseInfo.vue';
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import Scroll from 'components/common/scroll/Scroll.vue';
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue';
import DetailParamInfo from './childComps/DetailParamInfo.vue';
import DetailParamsInfo from './childComps/DetailParamsInfo.vue';
import DetailCommentInfo from './childComps/DetailCommentInfo.vue';
import GoodsList from 'components/content/goods/GoodsList.vue';

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
import {itemListenerMixin} from "common/mixin" // 加
 //导入防抖
import {debounce} from "common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      GoodsList,
      Scroll 
  },
  mixins:[itemListenerMixin],
  data()  {
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop: {},
      detailInfo:{},
      paramInfo: {},
      itemParams: {},
      commentInfo:{},
      recommends:[]
    }
  },
  created () {
    // 这样可以拿到跳转连接里面携带的产品id
    // 1.保存传入的iid
    this.iid=this.$route.params.iid;

    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res=> {
    // 1.获取顶部的图片轮播数据
    console.log(res);
    const data=res.result;
   this.topImages = data.itemInfo.topImages

    // 2.获取商品信息
   this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

   // 3.创建店铺信息
   this.shop = new Shop(data.shopInfo)

   // 4.保存商品的详细数据
   this.detailInfo=data.detailInfo;

   // 5.获取参数信息
   this.paramInfo=new GoodsParam(data.itemParams.info,data.itemParams.rule)

   // 6.取出参数信息
   this.itemParams=data.itemParams

   // 7.取出商品评论信息
   if(data.rate.cRate !==0) {
     this.commentInfo=data.rate.list[0]
   }

   // 8.请求推荐数据
   getRecommend().then(res=>{
   this.recommends=res.data.list;
   })

    })
  },
  mounted() {

  },
   methods: {
    imageLoad() {
     this.$refs.scroll.refresh()
      }
    }
}
</script>

<style scoped>
    #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>