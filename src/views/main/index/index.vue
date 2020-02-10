<template>
  <div>
    <!-- 头部 -->
    <nav-header></nav-header>

    <div class="index-container">
      <div class="index-container-center">
        <div class="center-left-index">
          <div v-for="item in articleAll" v-bind:key="item.id" class="index-article">
            <div class="index-article-main">
              <h2 style="text-align: center;">
                <router-link v-bind:to="{path: '/artDetail', query: {'articleId': item._id}}">
                  <span style="color: #303030;font-size: 40px;">{{ item.title }}</span>
                </router-link>
              </h2>
              <p style="text-align: center;font-size: 14px;color: #959595;">
                <span>{{ item.addTime }}</span>
              </p>
              <p>
                {{ item.description }}
              </p>
              <p>
                <router-link v-bind:to="{path: '/artDetail', query: {'articleId': item._id}}">
                  阅读全文
                </router-link>
              </p>
            </div>
            <div class="index-article-footer">
              <span>0 评论</span>
              <span>{{ item.views }} 阅读</span>
              <span>分享</span>
            </div>
          </div>

          <ul class="page">
            <li>
              <!--<router-link v-bind:to="{path: '', query:{'currentPage': currentPage - 1}}">上一页</router-link>-->
              <a @click="pagination(currentPage - 1)" href="javascript:;">上一页</a>
            </li>
            <li>
              {{ currentPage }} / {{ pageCount }}
            </li>
            <li>
              <!--<router-link v-bind:to="{path: '', query:{'currentPage': currentPage + 1}}">下一页</router-link>-->
              <a @click="pagination(currentPage + 1)" href="javascript:;">下一页</a>
            </li>
          </ul>
        </div>
        <div class="center-right">
          <div>
            最新文章
            <ul>
              <li v-for="item in articleNewTenTitle" v-bind:key="item.id">
                <router-link v-bind:to="{path: '/artDetail', query: {articleId: item._id}}">{{ item.title }}</router-link>
              </li>
            </ul>
          </div>
          <div>
            最新留言
          </div>
        </div>
      </div>
    </div>

    <!-- footer -->
    <nav-footer></nav-footer>
  </div>
</template>
<style lang="scss">
  @import "index.scss";
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
      // 列表数据
      articleAll: [],
      // 总条数
      count: '',
      // 总页数
      pageCount: '',
      // 每页显示条数
      pageSize: '',
      // 当前页
      currentPage: '',
      // 热门前十篇文章标题
      articleNewTenTitle: []
    }
  },
  mounted () {
    this.init()
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
  },
  computed: {

  },
  components: {
    NavHeader,
    NavFooter
  },
  methods: {
    init () {
      this.pagination()
      this.articleNewTen()
    },
    /**
     * 分页
     * @param currentPage 当前点击的页码
     */
    pagination (currentPage) {
      // 获取所有文章
      axios.post('/index/articleAll', {
        currentPage: currentPage,
        pageSize: 5,
        articleStatus: 0
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.articleAll = res.result.list
          // 总条数
          this.count = res.result.count
          // 总页数
          this.pageCount = res.result.pageCount
          // 每页显示条数
          this.pageSize = res.result.pageSize
          // 当前第几页
          this.currentPage = res.result.currentPage
        }
      })
    },
    /**
     * 获取最新文章（十篇）
     */
    articleNewTen () {
      axios.post('/index/articleNewTen', {
        newTen: 10,
        articleStatus: 0
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          this.articleNewTenTitle = res.result
        }
      })
    }
  }
}
</script>
