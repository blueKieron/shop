<template>
   <div id="cart-list-item">
    <check-button :is-checked="product.checked" @click.native="checkClick"></check-button>
    <div class="item_img">
      <img :src="product.image" alt="" />
    </div>
    <div class="item_info">
      <p class="item_title">{{ product.title }}</p>
      <p class="item_desc">{{ product.desc }}</p>
      <span class="item_price">￥{{ product.price }}</span>
      <span class="item_count">x{{ product.count }}</span>
    </div>
   </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.product.checked = !this.product.checked
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
#cart-list-item {
  display: flex;
  padding: 8px 6px;
  width: 100%;
  height: 5.5rem;
  border-bottom: 0.04rem solid rgba(128, 128, 128, 0.4);
}

.item_img {
  width: 3.5rem;
  height: 100%;
  margin-left: 4px;
}
.item_img img {
  width: 100%;
  height: 100%;
  border-radius: 0.4rem;
}

.item_info {
  position: relative;
  width: calc(100% - 3.5rem - 1.2rem - 0.4rem);
  margin-left: 0.4rem;
}
.item_info p {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.item_title {

  font-size: 0.84rem;
  padding: 0.3rem 0 0.2rem;
  font-weight: 600;
}
.item_desc {
  font-size: 0.5rem;
  color: gray;
}
.item_price {
  position: absolute;
  left: 0;
  bottom: 0.4rem;
  font-size: 0.75rem;
  color: orangered;
}
.item_count {
  position: absolute;
  right: 0.4rem;
  bottom: 0.4rem;
  font-size: 0.75rem;
}
</style>
