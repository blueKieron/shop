<template>
   <div class="check-button" :class="{check: isChecked}">
     <img src="~assets/img/cart/tick.svg" alt="">
   </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
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
/* @import url(); 引入css类 */
.check-button {
  width: 17px;
  height: 17px;
  align-self: center;
  border-radius: 50%;
  border: 2px solid #aaa;
}

.check {
  border-color: red;
  background-color: red;
}
</style>
