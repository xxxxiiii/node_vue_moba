<template>
  <div class="card bg-white p-3 mt-3 ">
      <div class="card-header d-flex ai-center pb-3">
        <i class="iconfont icon-Menu"></i>
        <strong class=" title fs-lg flex-1 px-2">{{title}}</strong>
      </div>
      <div class="card-body pt-3">
        <slot></slot>
      </div>
    </div>
</template>

<script>
export default {
    name: 'HeroCard',
    props: {
        title: {
            type: String,
            require: true
        }
    }
}
</script>

<style lang="scss">

</style>