<template>
  <div class="home">
    <swiper :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/0181ecf7eda7589f0e780207e135f974.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/d41dfc1e23629c7c16c42d7ddedbcda9.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/b7e66357d69215808422a7c1f1e79d27.jpg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="item in navIcons" :key="item.icon">
          <i class="sprite" :class="`sprite-${item.icon}`"></i>
          <div class="py-2">{{item.name}}</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem ">
          <router-link
            class="p-2 text-center"
            style="width: 20%"
            tag="div"
            :to="`/heroes/${hero._id}`"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avator" class="w-100" alt />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import dayjs from "dayjs";

export default {
  name: "Home",
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      navIcons: [
        {icon: 'blz', name: '爆料站'},
        {icon: 'gsz', name: '故事站'},
        {icon: 'zbsc', name: '周边商城'},
        {icon: 'tyf', name: '体验服'},
        {icon: 'xrzq', name: '新人专区'},
        {icon: 'rycc', name: '荣耀传承'},
        {icon: 'mnzzlk', name: '模拟战资料库'},
        {icon: 'wzyd', name: '王者营地'},
        {icon: 'gzh', name: '公众号'},
        {icon: 'bbjs', name: '版本介绍'},
        {icon: 'djhj', name: '对局环境'},
        {icon: 'wxwzt', name: '无限王者团'},
        {icon: 'cyhdy', name: '创意互动营'},
        ],
      swiperOptions: {
        pagination: {
          el: ".pagination-home"
        }
        // Some Swiper option/callback...
      },
      newsCats: [],
      heroCats: [],

    };
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  }
};
</script>
<style lang="scss">
@import "../assets/scss/_variables.scss";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>