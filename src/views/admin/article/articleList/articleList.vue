<template>
  <div>
    文章列表
    <table border="1">
      <thead>
        <tr>
          <th>文章id</th>
          <th>所属分类</th>
          <th>标题</th>
          <th>发布时间</th>
          <th>阅读量</th>
          <th>状态(0上架、1下架、2草稿)</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in articleList" v-bind:key="item.id">
          <th>{{ item._id }}</th>
          <th>{{ item.category.name }}</th>
          <th>{{ item.title }}</th>
          <th>{{ item.addTime }}</th>
          <th>{{ item.views }}</th>
          <th>{{ articleStatus(item.articleStatus) }}</th>
          <th>
            <a @click="articleDel(item._id, item.category._id)" href="javascript:;">删除</a>
            <a v-if="item.articleStatus === 0" @click="articleUpdateStatus(item._id, 1)" href="javascript:;">下架</a>
            <a v-if="item.articleStatus !== 0" @click="articleUpdateStatus(item._id, 0)" href="javascript:;">上架</a>
            <a @click="articleEdit(item._id)" href="javascript:;">修改</a>
          </th>
        </tr>
      </tbody>
    </table>

  </div>
</template>
<style>

</style>
<script>
// axios
import axios from 'axios'
export default {
  data () {
    return {
      // 文章列表
      articleList: '',
      // 分类列表
      categoryList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      /**
       * 获取所有文章
       */
      axios.get('/admin/articleList').then((response) => {
        var res = response.data

        if (res.status === '0') {
          this.articleList = res.result.list
        }
      })
      /**
       * 获取所有分类
       */
      axios.get('/admin/categoryList').then((response) => {
        var res = response.data

        if (res.status === '0') {
          this.categoryList = res.result.list
        }
      })
    },
    /**
     * 删除文章
     * @param articleId 文章id
     */
    articleDel (articleId, categoryId) {
      axios.post('/admin/articleDel', {
        articleId: articleId
      }).then((response) => {
        var res = response.data

        if (res.status === '0') {
          alert('删除成功~')

          // 分类数量加1
          axios.post('/admin/categoryNumber', {
            categoryId: categoryId,
            categoryFlag: 'remove'
          }).then((response) => {
          })

          this.init()
        }
      })
    },
    /**
     * 修改文章
     * @param articleId 文章id
     */
    articleEdit (articleId) {
      this.$router.push({
        path: '/admin/articleAdd',
        query: {articleId: articleId}
      })
    },
    /**
     *
     * @param flag 文章状态（0代表上架、1代表下架、2代表保存成草稿）
     */
    articleStatus (flag) {
      var result = ''
      if (flag === 0) {
        result = '上架'
      } else if (flag === 1) {
        result = '下架'
      } else if (flag === 2) {
        result = '草稿'
      }
      return result
    },
    articleUpdateStatus (articleId, articleStatus) {
      axios.post('/admin/articleArticleStatus', {
        articleId: articleId,
        articleStatus: articleStatus
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          alert(res.msg)
          this.init()
        }
      })
    }
  }
}
</script>
