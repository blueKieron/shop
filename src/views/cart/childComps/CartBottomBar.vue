<template>
  <div id="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate" @click="calcClick">去计算:({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        '¥' +
        this.cartList
          .filter((item) => item.checked)
          .reduce((pre, item) => {
            return pre + item.price * item.count
          }, 0)
          .toFixed(2)
      )
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length
    },
    isSelectAll() {
      return this.cartList.every((item) => item.checked)
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach((item) => (item.checked = false))
      } else {
        this.cartList.forEach((item) => (item.checked = true))
      }
    },
    calcClick() {
      if (!this.isSelectAll) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
#bottom-bar {
  display: flex;
  height: 32px;
  position: relative;
  background-color: #eee;
  font-size: 14px;
  line-height: 32px;
  padding: 0 10px;
}
.check-content {
  display: flex;
  align-items: center;
  width: 50px;
}
.check-button {
  width: 18px;
  height: 18px;
  line-height: 18px;
  margin-right: 3px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 80px;
  background: rgb(247, 148, 148);
  color: #fff;
  border-radius: 2px;
  text-align: center;
}
</style>
