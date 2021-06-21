<template>
  <div id="detail">
    <detail-nav-bar
      ref="nav"
      @titleClick="titleClick"
      class="detail-nav"
    ></detail-nav-bar>
    <scroll
      class="detail-content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @detailGoodsImageLoad="detailGoodsImageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramsInfo"
      ></detail-param-info>
      <detail-recomment-info
        ref="recomment"
        :comment="commentInfo"
      ></detail-recomment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
// import Toast from '../../components/common/toast/Toast.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'
import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
import DetailShopInfo from './childComps/DetailShopInfo.vue'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailRecommentInfo from './childComps/DetailRecommentInfo.vue'
import DetailBottomBar from './childComps/DetailBottomBar.vue'

import { debounce } from 'common/utils'
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from 'network/detail'
import { itemListenerMinxin, backTopMinxin } from 'common/mixin'
import { BACK_POSITION } from 'common/const'
import { mapActions } from 'vuex'

export default {
  name: 'Detail',
  components: {
    Scroll,
    // Toast,
    GoodsList,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailRecommentInfo,
    DetailBottomBar
  },
  mixins: [itemListenerMinxin, backTopMinxin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
      // message: '',
      // show: false
    }
  },
  created() {
    // 1.保存
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      const data = res.result
      // 轮播图片
      this.topImages = data.itemInfo.topImages
      // 商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      // 店铺信息
      this.shop = new Shop(data.shopInfo)
      // 详情数据
      this.detailInfo = data.detailInfo
      // 参数信息
      this.paramsInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      // 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      console.log(this.commentInfo)

      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM是已经被渲染出来
      //   // 但是图片依然是没有加载完（目前获取到offsetTop不包含其中的图片）
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      // })
    })
    // 推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list
      console.log(this.recommends)
    })
    // 给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recomment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
    }, 100)
  },
  mounted() {},
  // updated() {
  //   this.themeTopYs = []
  //   this.themeTopYs.push(0)
  //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  // },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    detailGoodsImageLoad() {
      this.newRefresh()
      this.getThemeTopY()
    },
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y
      const length = this.themeTopYs.length
      // positionY和主题中值进行对比
      // for (let i = 0; i < length; i++) {
      //   if (
      //     (this.currentIndex != i &&
      //       i < length - 1 &&
      //       positionY >= this.themeTopYs[i] &&
      //       positionY < this.themeTopYs[i + 1]) ||
      //     (i === length - 1 && positionY >= this.themeTopYs[i])
      //   ) {
      //     this.currentIndex = i
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
      console.log(BACK_POSITION)
      // 是否显示回到顶部
      this.isShowBackTop = -position.y > BACK_POSITION
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid
      // 将商品添加到购物车里 (1.promise 2.mapActions)
      // this.$store.commit('addCart', product)
      // this.$store.dispatch('addCart', product).then(res => {

      // })
      this.addCart(product).then(res => {
        // this.show =true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500)

        this.$toast.show(res)
      })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  height: 100vh;
  z-index: 9;
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.detail-content {
  height: calc(100% - 93px);
  background-color: #fff;
}
</style>
