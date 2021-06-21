<template>
   <div class="cart">
     <nav-bar>
       <div slot="center">购物车({{length}})</div>
     </nav-bar>
     <cart-list></cart-list>
     <cart-bottom-bar></cart-bottom-bar>
   </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList.vue'
import CartBottomBar from './childComps/CartBottomBar.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  data() {
    return {

    }
  },
  computed: {
    // 1.
    // ...mapGetters(['cartLength', 'cartList'])
    // 2.
    ...mapGetters({
      length: 'cartLength'
    })
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted() {

  }
}
</script>
<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>
