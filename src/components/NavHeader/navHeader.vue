<!-- 组件：头部导航 -->
<template>
  <div class="nav-header">
    <ul>
      <li>
        <router-link v-bind:to="{path: '/'}">首页</router-link>
      </li>
      <li>
        <router-link v-bind:to="{path: '/blog'}">博客</router-link>
      </li>
      <li>
        <router-link v-bind:to="{path: '/categories'}">分类</router-link>
      </li>
      <li>
        <a href="javascript:;">标签</a>
      </li>
      <li>
        <a href="javascript:;">开源项目</a>
      </li>
      <li>
        <a href="javascript:;">收藏</a>
      </li>
      <li>
        <a href="javascript:;">时间轴</a>
      </li>
      <li>
        <router-link v-bind:to="{path: '/about'}">关于</router-link>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
  @import "navHeader.scss";
</style>
<script>
// axios
// import axios from 'axios'
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.init()
  },
  computed: {

  },
  components: {

  },
  methods: {
    init () {

    }
  }
}
</script>
