<template>
  <div class="page-article">
    <div class="d-flex py-2 ai-center jc-center border-bottom">
      <i class="iconfont icon-fanhui text-blue" @click="$router.push('/')"></i>
      <strong class="flex-1 text-ellipsis mx-1 fs-xs text-blue ">{{model.title}}</strong>
      <div class="text-grey fs-xxs mr-2">2021/12/31</div>
    </div>
    <div v-html="model.body" class="px-3 fs-l body"></div>
    <div class="border-top d-flex px-3 py-3">
      <i class="iconfont icon-Contactinterviews mr-2 fs-xl"></i>
      <strong class="text-blue">相关资讯</strong>
    </div>
    <div class="px-3 py-2">
      <router-link tag='div' :to="`/article/${item._id}`" v-for="item in model.related" :key="item._id" class="py-2">
        {{item.title}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  watch: {
    id() {
      this.fetch()
    }
  },
  data() {
    return {
      model: ''
    }
  },
  created: function () {
    this.fetch()  },
  methods: {
    async fetch() {
      const { data: res } = await this.$http.get('/article/' + this.id)
      this.model = res
    }

  },
}
</script>
<style lang="scss">
.page-article {
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
  }
  iframe {
    width: 100%;
    height: auto;
  }
}
</style>

