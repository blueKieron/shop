<template>
   <div class="cart-list">
     <scroll class="content" ref="scroll">
       <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"></cart-list-item>
     </scroll>
   </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.cart-list {
  height: calc(100% - 126px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>
