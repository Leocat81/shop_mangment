<template>
  <div>
    <nav-header></nav-header>

    <div class="index-container">
      <div class="index-container-center">
        <div class="center-left">

          <ul>
            <li v-for="item in articleList" v-bind:key="item.id">
              <span>{{ item.addTime | filterTime}}</span>

                <router-link v-bind:to="{path: '/artDetail', query:{articleId: item._id}}">
                  <span style="color:#4d6dad;font-weight:bold;">{{ item.title }}</span>
                </router-link>

            </li>
          </ul>

        </div>
        <div class="center-right">
          <div>
            <h3 style="text-align: center">分类</h3>
            <li v-for="item in categoryList" v-bind:key="item.id">
              <a @click="categoryFindType(item._id)" href="javascript:;">
                {{ item.name }}
                <span>({{ item.count }})</span>
              </a>
            </li>
          </div>
        </div>
      </div>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>
<style lang="scss">
  @import "../index/index.scss";
</style>
<script>
// 头部
import NavHeader from '@/components/navHeader/navHeader.vue'
// footer
import NavFooter from '@/components/navFooter/navFooter.vue'
// axios
import axios from 'axios'
export default {
  data () {
    return {
      // 分类列表
      categoryList: [],
      // 文章
      articleList: []
    }
  },
  mounted () {
    this.init()
  },
  components: {
    NavHeader,
    NavFooter
  },
  methods: {
    init () {
      /**
       * 获取分类
       */
      axios.get('/admin/categoryList').then((response) => {
        var res = response.data
        if (res.status === '0') {
          // var len = res.result.list.length

          this.categoryList = res.result.list

          // 显示第一个默认分类的文章
          if (res.result.list[0]._id) {
            this.categoryFindType(res.result.list[0]._id)
          }
        }
      })
    },
    /**
     * 获取对应的分类文章
     * @param categoryId
     */
    categoryFindType (categoryId) {
      axios.post('/index/articleAll', {
        categoryId: categoryId
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.articleList = res.result.list
        }
      })
    }
  },
  filters: {
    /**
     * 时间过滤器：只显示年月日
     * @param val 原始日期格式
     * @returns {*} 返回年月日
     */
    filterTime (val) {
      return val.split(' ')[0]
    }
  }
}
</script>
