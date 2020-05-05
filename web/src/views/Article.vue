<template>
  <div class="page-acticle" v-if="model">
    <div class="d-flex  py-3 px-2">
      <div class="iconfont icon-back text-blue"></div>
      <strong class="flex-1 text-blue pl-2">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xs">

      </div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>
    <div class="p-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-menu"></i>
          <strong class="text-blue fs-lg ml-1">相关资讯</strong>
        
      </div>
      <div class="pt-2">
        <router-link
        class="py-1"
        tag="div"
        :to="`/articles/${item._id}`"
        v-for="item in model.related" :key="item._id">
        {{item.title}}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    id: { require: true}
  },
  data() {
    return {
      model: null
    }
  },
  created() {
    this.fecth()
  },
  watch: {
    id: 'fetch'
  },
  methods: {
    async fecth() {
      const res = await this.$http.get(`articles/${this.id}`)
      this.model = res.data
    }
  }
}
</script>
<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.6923rem;
  }
  .body {
    img ,iframe {
      width: 100%;
      height: auto;
    }
    
  }
}
</style>