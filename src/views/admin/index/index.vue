<template>
  <div class="admin">
    <div class="admin-header">
      头部
    </div>

    <div class="admin-main">
      <!-- 目录 -->
      <div class="admin-side-Menu">
        <p>
          <router-link v-bind:to="{path: '/'}">前台首页</router-link>
        </p>
        <p>
          <router-link v-bind:to="{path: '/admin/dashboard'}">后台首页</router-link>
        </p>
        <br>

        <ul>
          <li>文章</li>
          <li>
            <router-link v-bind:to="{path: '/admin/articleAdd'}">添加文章（markdown）</router-link>
          </li>
          <li>
            <router-link v-bind:to="{path: '/admin/articleList'}">文章列表</router-link>
          </li>
        </ul>
        <br>

        <ul>
          <li>文章分类</li>
          <li>
            <router-link v-bind:to="{path: '/admin/categoryAdd'}">添加分类</router-link>
          </li>
          <li>
            <router-link v-bind:to="{path: '/admin/categoryList'}">分类列表</router-link>
          </li>
        </ul>
        <br>

        <ul>
          <li>留言</li>
          <li>留言列表</li>
          <li>分类列表（删除、修改）</li>
        </ul>
        <br>

      </div>

      <!-- 内容 -->
      <div class="admin-container">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>
<style lang="scss">
  @import "index.scss";
</style>
<script>
// axios
import axios from 'axios'
export default {
  data () {
    return {

    }
  },
  mounted () {
    this.checkLogin()
  },
  computed: {

  },
  components: {

  },
  methods: {
    /**
     * 检测是否登录
     */
    checkLogin () {
      axios.get('/admin/checkLogin').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.userId = res.result
        } else {
          if (this.$route.path !== '/index') {
            this.$router.push('/index')
          }
        }
      })
    }
  }
}

</script>
