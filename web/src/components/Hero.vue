<template>
  <div class='page-hero' v-if="model">
    <div class="topbar bg-dark py-2 d-flex ai-center jc-center ">
      <img src="../assets/logo.png" class="mx-3" alt="" style="height:2.3077rem">
      <div class="text-white ">王者荣耀</div>
      <div class="text-white fs-l flex-1 ml-3">攻略战</div>
      <router-link tag='div' to="/" class="text-white fs-l mr-3">更多英雄 &gt;</router-link>
    </div>
    <!-- <h1>{{model.name}}</h1> -->
    <!-- <div>{{model}}</div> -->
    <div class="top d-flex flex-clolumn jc-end" :style="{'background-image':`url(${model.banner})`}">
      <div class="info"></div>
      <div class=" info1 p-2 w-100 text-white fs-xs d-flex jc-between ">
        <div class="p-2">
          <span class="">{{model.title}}</span>
          <h2 class="mt-1 mb-1 fs-xl">{{model.name}}</h2>
          <span>{{model.categories.map(v=>v.name).join('/')}}</span>
          <div class="scores">
            <span>难度</span>
            <span class="bg-primary badeg">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="bg-blue badeg">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="bg-danger badeg">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="bg-grey badeg">{{model.scores.survive}}</span>
          </div>
        </div>
        <div class="d-flex flex-clolumn jc-end">
          <router-link tag='span' to="/" class="text-grey fs-xs">皮肤: 2 &gt;</router-link>
        </div>
      </div>
    </div>
    <div class="">
      <div class="bg-white">
        <div class="px-2  nav pt-3 pb-2 d-flex jc-around  border-bottom">
          <div class="nav-item active">
            <div class="nav-link">英雄初识</div>
          </div>
          <div class="nav-item">
            <div class="nav-link">进阶攻略</div>
          </div>
        </div>
      </div>
      <swiper>
        <swiper-slide>
          <div>
            <div class="p-2 bg-white">
              <div class="d-flex">
                <router-link class="btn-lg" tag="span" to="/">
                  <i class="iconfont icon-shi_pin"></i>
                  <span>英雄介绍视频</span>
                </router-link>
                <router-link class="btn-lg ml-2" tag="span" to="/">
                  <i class="iconfont icon-shi_pin"></i>
                  <span>一图识英雄</span>
                </router-link>
              </div>
              <div class="d-flex jc-around skills">
                <img @click="currentSkillsIndex=i" :class='{active:currentSkillsIndex==i}' class="mt-3 icon" :src="item.icon" v-for="(item,i) in model.skills" :key=i>
              </div>
              <div v-if="currentSkill" class="p-2">
                <div class="d-flex ai-center mt-3  mb-4">
                  <h3 class="m-0 mr-4">{{currentSkill.name}}</h3>
                  <span class=" text-grey fs-xs">
                    (冷却值:{{currentSkill.delay}} 消耗:{{currentSkill.cost}})
                  </span>
                </div>
                <p class="mt-3 " style="line-height: 1.5rem;">{{currentSkill.description}}</p>
                <div class="border-bottom"></div>
                <p class="text-grey">小提示:{{currentSkill.tips}}</p>
              </div>
            </div>
            <m-card plain icon="menu1" title="出装推荐">
              <div>
                <p>顺风出装</p>
                <div class="d-flex jc-around text-center">
                  <div v-for="(item,i) in model.items1" :key=i>
                    <img class="equipIcon" :src="item.icon" alt="">
                    <div class="fs-xxs">{{item.name}}</div>
                  </div>
                </div>
                <div class="border-bottom mt-2"></div>
                <p>逆风出装</p>
                <div class="d-flex jc-around text-center">
                  <div v-for="(item,i) in model.items2" :key=i>
                    <img class="equipIcon" :src="item.icon" alt="">
                    <div class="fs-xxs">{{item.name}}</div>
                  </div>
                </div>

              </div>
            </m-card>
            <m-card plain icon="menu1" title="使用技巧">
              <p class="mt-2">
                {{model.usageTips}} </p>
            </m-card>
            <m-card plain icon="menu1" title="对抗技巧">
              <p>
                {{model.battleTips}}
              </p>
            </m-card>
            <m-card plain icon="menu1" title="团战思路">
              <p>
                {{model.teamTips}}
              </p>
            </m-card>
            <m-card plain icon="menu1" title="英雄关系">
              <p>最佳搭档</p>
              <div class="d-flex jc-center" v-for="(item,i) in model.partners" :key=i>
                <img class="mr-3" style="height:45px" :src="item.hero.avatar" alt="">
                <p>{{item.description}}</p>
              </div>
            </m-card>
          </div>
        </swiper-slide>
        <swiper-slide>2</swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    id: { required: true }
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentSkillsIndex]
    }
  },
  data() {
    return {
      model: {
        categories: [],
        scores: [],
        skills: []
      },
      currentSkillsIndex: 0

    }
  },
  created: function () {
    this.fetch()
  },
  methods: {
    async fetch() {
      const { data: res } = await this.$http.get(`heroes/${this.id}`)
      this.model = res
      console.log(this.model)
    }
  },
}
</script>

<style lang="scss">
@import "../assets/css/variables.scss";
.page-hero {
  .topbar {
    position: relative;
    z-index: 999;
  }
  .top {
    height: 50vw;
    background: no-repeat top center;
    background-size: auto 100%;
    .info {
      position: absolute;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
      opacity: 0.5;
    }
    .info1 {
      position: absolute;
    }
    .scores {
      .badeg {
        display: inline-block;
        width: 1rem;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        border-radius: 50%;
        margin: 0 0.4rem;
        font-size: 0.5rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .skills {
    img.icon {
      width: 5.3846rem;
      height: 5.3846rem;
      border: 3px solid map-get($colors, "white");
      &.active {
        border: 3px solid map-get($colors, "primary");
        border-radius: 45%;
      }
    }
  }
  .equipIcon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>