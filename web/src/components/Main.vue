<template>
  <div>
    <div class="topbar bg-dark py-2 d-flex ai-center jc-center">
      <img src="../assets/logo.png" class="mx-3" alt="" style="height:2.3077rem">
      <div class="flex-1">
        <div class="text-white">王者荣耀</div>
        <div class="fs-xxs text-grey">团队成就更多</div>
      </div>
      <button class="bg-primary mr-3 fs-sm py-1">立即下载</button>
    </div>
    <div class="bg-primary py-3">
      <div class="nav nav-inverse jc-around">
        <div class="nav-item active">
          <router-link class='nav-link' tag='div' to='/'>首页</router-link>
        </div>
        <div class="nav-item">
          <router-link class='nav-link' tag='div' to='/'>攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link class='nav-link' tag='div' to='/'>赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created: function () { },
  methods: {},
}
</script>

<style scoped lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>
