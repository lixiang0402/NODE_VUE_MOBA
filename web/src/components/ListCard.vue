<template>
  <m-card :title="title" :icon='icon'>
    <div class="card-body mt-3">
      <div class="nav  jc-between">
        <div class="nav-item " :class='{active:active ==i}' v-for="(item,i) in categories" :key='i' @click="$refs.list.$swiper.slideTo(i)">
          <div class="nav-link ">{{item.name}}</div>
        </div>
      </div>
      <div class="mt-3">
        <swiper ref='list' @slide-change="()=>active=$refs.list.$swiper.realIndex" :options="{autoHeight:true}">
          <swiper-slide v-for='(category,i) in categories' :key=i>
            <slot name='items' :category='category'></slot>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  data() {
    return {
      active: 0
    }
  },
}
</script>

<style  lang="scss">
.card-body {
  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
}
</style>
