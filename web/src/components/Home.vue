<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item,i) in adsList" :key=i>
        <a :href="item.url">
          <img class="w-100" :src="item.img">
        </a>
      </swiper-slide>
      <div class="swiper-pagination text-right pr-3 mb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3 pt-3 ">
      <div class="d-flex flex-wrap">
        <div class="nav-items mb-3 text-center">
          <i class="sprite sprite-news"></i>
          <div class="py-2 ">爆料站</div>
        </div>
        <div class="nav-items mb-3 text-center">
          <i class="sprite sprite-story"></i>
          <div class="py-2 ">故事站</div>
        </div>
        <div class="nav-items mb-3 text-center">
          <i class="sprite sprite-buy"></i>
          <div class="py-2 ">周边商城</div>
        </div>
        <div class="nav-items mb-3 text-center">
          <i class="sprite sprite-tiyan"></i>
          <div class="py-2 ">体验服</div>
        </div>
        <div class="nav-items mb-3 text-center">
          <i class="sprite sprite-xinren"></i>
          <div class="py-2 ">新人专区</div>
        </div>
        <div class="nav-items mb-3 text-center">
          <i class="sprite sprite-rongyaochuancheng"></i>
          <div class="py-2 ">荣耀传承</div>
        </div>
        <div class="nav-items mb-3 text-center">
          <i class="sprite sprite-monizhan"></i>
          <div class="py-2 ">模拟战资料库</div>
        </div>
        <div class="nav-items mb-3 text-center">
          <i class="sprite sprite-wangzheyingdi"></i>
          <div class="py-2 ">王者营地</div>
        </div>
        <div class="nav-items mb-3 text-center">
          <i class="sprite sprite-gongzhonghao"></i>
          <div class="py-2 ">公众号</div>
        </div>
        <!-- <div class="nav-items mb-3 text-center">
          <i class="sprite sprite-wangzhetuan"></i>
          <div class="py-2 ">无线王者团</div>
        </div> -->
      </div>
      <div class="bg-light py-2 text-center d-flex ai-center jc-center fs-sm">
        <i class="sprite sprite-pickup"></i>
        <span class="ml-1">收起</span>
      </div>
    </div>
    <!-- end of navicon  -->
    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link class="my-2 ml-1 d-flex fs-lg" tag="div" :to="`/article/${item._id}`" v-for="(item,i) in category.newsList" :key=i>
          <span class="text-info">[{{item.categoryName}}]</span>
          <span class='px-2'>|</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{item.title}}</span>
          <span class="fs-s text-grey">{{item.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- <i class="iconfont icon-menu"></i> -->
    <m-list-card icon="toukui" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class='d-flex flex-wrap' style="margin:0 -.5rem">
          <router-link tag="div" :to="`/heroes/${item._id}`" class="p-2  text-center" style="width:20%" v-for="(item,i) in category.heroList" :key=i>
            <img class='w-100' :src="item.avatar">
            <div>{{item.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- <m-list-card icon="toukui" title="英雄列表"></m-list-card> -->

  </div>
</template>

<script>
// 初始化日期格式
import dayjs from 'dayjs'
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD")
    }
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        pagination: {
          el: '.swiper-pagination'
        },
      },
      newsCats: [],
      heroCats: [],
      adsList: []
    }

  },
  async created() {
    this.fetchNewsCats()
    this.fetchHeroCats()
    this.fetchAds()
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get('news/list')
      this.newsCats = res.data
    },
    async fetchAds() {
      const { data: res } = await this.$http.get('ads/list')
      this.adsList = res[0].items
      console.log(res[0].items)

    },
    async fetchHeroCats() {
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
      console.log(res)
    }
  }
}
</script>

<style lang="scss">
@import "../assets/css/variables.scss";
.swiper-pagination {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background-color: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info") !important;
    }
  }
}
// nav icons
.nav-icons {
  border-top: 1px solid $border-color;
}
.nav-items {
  width: 25%;
  border-right: 1px solid $border-color;
  &:nth-child(4n) {
    border-right: none;
  }
}
</style>
