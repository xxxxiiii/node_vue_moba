<template>
  <m-card :icon="icon" :title="title">
      <div class="nav jc-between">
        <div class="nav-item" 
        v-for="(category,index) in categories" :key="index"
        :class="{active: isActive == index}"
        @click="$refs.list.$swiper.slideTo(index)">
          <div class="nav-link">{{category.name}}</div>
        </div>
        
      </div>
      <div class="pt-3">
        <swiper ref="list" :options="{autoHeight: true}"
        @slide-change="() => isActive = $refs.list.$swiper.realIndex">
          <swiper-slide v-for="(category,index) in categories" :key="index">
            <slot name="items" :category="category"></slot>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            require: true
        },
        icon: {
            type: String,
            require: true
        },
        categories: {
            type: Array,
            require: true
        }
    },
    data() {
        return {
            isActive: 0
        }
    }
}
</script>

<style>

</style>