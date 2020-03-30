<template>
  <div class="card p-3 bg-white mt-3">
    <div class="card-header d-flex ai-center jc-center" :class="{ 'border-bottom': !plain,'pb-3':!plain}">
      <i class="iconfont " :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <i v-if="!plain" class="iconfont icon-menu"></i>
    </div>
    <slot>

    </slot>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true },
    plain: { type: Boolean },
  }
}
</script>

<style scoped  lang='scss'>
@import "../assets/css/variables.scss";
.card {
  .card-header {
    // border-bottom: 1px solid $border-color;
  }
  border-bottom: 1px solid $border-color;
}
</style>
