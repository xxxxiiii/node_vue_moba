<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <i class="sprite sprite-logo" style="height: 30px"></i>
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="top" :style="{'background-image': `url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="fs-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="fs-sm">{{model.categories.map(v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-danger">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-dark">{{model.scores.survive}}</span>
          </div>
          <router-link to="/" tag="span" class="text-grey fs-sm">皮肤：4&gt;</router-link>
        </div>
      </div>
    </div>
    <div class="mid bg-white border-bottom">
      <div class="mid-header nav mx-3 pt-4 pb-2 jc-around border-bottom">
        <div class="nav-item active">
          <div class="nav-link">英雄初识</div>
        </div>
        <router-link class="nav-item" to="/" tag="div">
          <div class="nav-link">进阶攻略</div>
        </router-link>
      </div>
      <div class="mid-btn jc-around py-2 d-flex">
        <div class="btn-item px-2 py-2 bg-light text-center">
          <i class="sprite sprite-yxsp"></i>
          <span>英雄介绍视频</span>
        </div>
        <div class="btn-item px-2 py-2 bg-light text-center">
          <i class="sprite sprite-ytsyx"></i>
          <span>一图识英雄</span>
        </div>
      </div>
      <div class="mid-skills d-flex jc-between m-2 p-2">
        <div class="skills-icon" v-for="(item, index) in model.skills" :key="index">
          <div @click="changeIndex(index)">
            <img :class="{active: currentIndex == index}" :src="item.icon" />
          </div>
        </div>
      </div>
      <div class="m-2">
        <strong class="skills-name fs-lg mx-2">{{current.name}}</strong>
        <span class="text-grey-1">(冷却值：{{current.delay}} 消耗：{{current.cost}})</span>
        <div class="m-2 mt-4 text-dark-1 fs-md">
          <span>{{current.desciption}}</span>
        </div>
        <div v-if="current.tips">
          <span class="m-2 mt-4 text-grey fs-md">小提示：{{current.tips}}</span>
        </div>
      </div>
      
    </div>
    <m-hero-card title="出装推荐">
        <div>顺风出装</div>
        <div class="ad d-flex jc-between mt-2">
          <div class="items-icon mx-1" v-for="(item, index) in model.items1" :key="index">
            <img :src="item.icon" />
            <div class="fs-xs">{{item.name}}</div>
          </div>
        </div>
        <div>逆风出装</div>
        <div class="inf d-flex jc-between mt-2">
          <div class="items-icon mx-1" v-for="(item, index) in model.items2" :key="index">
            <img :src="item.icon" />
            <div  class="fs-xs">{{item.name}}</div>
          </div>
        </div>
      </m-hero-card>
      <m-hero-card title="使用技巧">
        <div class="m-1 text-dark-1 fs-md">
          <span>{{model.usageTips}}</span>
        </div>
      </m-hero-card>
      <m-hero-card title="对抗技巧">
        <div class="m-1 text-dark-1 fs-md">
          <span>{{model.battleTips}}</span>
        </div>
      </m-hero-card>
      <m-hero-card title="团战思路">
        <div class="m-1 text-dark-1 fs-md">
          <span>{{model.teamTips}}</span>
        </div>
      </m-hero-card>
      <m-hero-card title="英雄关系">
        <div>最佳搭档</div>
        <div class="partner-icon m-1 mb-3 p-2 text-dark-1 fs-md d-flex"
        v-for="item in model.partners" :key="item._id">
          <img class="mr-2 " :src="item.hero.avator">
          <div>{{item.desciption}}</div>
        </div>
      </m-hero-card>
      
  </div>
</template>
<script>
export default {
  props: {
    id: { require: true }
  },
  data() {
    return {
      model: null,
      currentIndex: 0,
      current: null
    };
  },
  created() {
    this.fecth();
  },

  methods: {
    async fecth() {
      const res = await this.$http.get(`heroes/${this.id}`);
      this.model = res.data;
      this.current = this.model.skills[this.currentIndex];
      console.log(this.model);
    },
    changeIndex(index) {
      this.currentIndex = index;
      this.current = this.model.skills[this.currentIndex];
    }
  }
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }
    }
  }
  .mid-btn {
    .btn-item {
      width: 42%;
      border-radius: 0.2308rem;
      border: 1px solid $border-color;
    }
  }
  .skills-icon {
    img {
      width: 75%;
      &.active {
        border-radius: 50%;
        border: 2px solid map-get($colors, "primary");
      }
    }
  }

  .items-icon {
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .partner-icon{
    img {
      width: 15%;
      height: 15%;
    }
  }
}
</style>