<template>
  <div>
    分类名称
    <input v-model="name" type="text"><br>
    <button @click="submitFn">提交</button>
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
      // 分类名称
      name: '',
      // 要修改分类的id
      categoryId: ''
    }
  },
  mounted: function () {
    this.init()
  },
  watch: {
    /**
     * 路由发生改变
     * to：当前路由
     * from：上一个页面的路由
     */
    '$route' (to, from) {
      if (to !== from) {
        this.categoryId = ''
        this.name = ''
      }
    }
  },
  methods: {
    init () {
      // 获取分类的id
      var categoryId = this.$route.query.categoryId
      // 如果路由categoryId有参数，那么代表要修改
      if (categoryId !== undefined) {
        this.categoryId = categoryId
        // 根据分类id，查询分类的名称
        axios.post('/admin/categoryFindOne', {
          categoryId: categoryId
        }).then((response) => {
          var res = response.data
          if (res.status === '0') {
            this.name = res.result.name
          } else {
            alert(res.msg)
          }
        })
      }
    },
    /**
     * 提交按钮
     */
    submitFn () {
      if (this.categoryId) {
        // 修改
        this.categoryEdit()
      } else {
        // 添加
        this.categoryAdd()
      }
    },
    /**
     * 添加分类
     */
    categoryAdd () {
      axios.post('/admin/categoryAdd', {
        name: this.name
      }).then((response) => {
        var res = response.data

        if (res.status === '0') {
          this.name = ''
          alert(res.msg)

          // 跳转到分类列表页
          this.$router.push({
            path: '/admin/categoryList'
          })
        } else {
          alert(res.msg)
        }
      })
    },
    /**
     * 修改分类
     */
    categoryEdit () {
      var params = {
        categoryId: this.categoryId,
        categoryName: this.name
      }
      // 测试axios二次封装post请求
      // this.$post('/admin/categoryEdit', params).then((res) => {
      //  console.log(res)
      // })
      axios.post('/admin/categoryEdit', {
        categoryId: this.categoryId,
        categoryName: this.name
      }).then((response) => {
        var res = response.data

        if (res.status === '0') {
          this.name = ''
          alert(res.msg)

          // 跳转到分类列表页
          this.$router.push({
            path: '/admin/categoryList'
          })
        } else {
          alert(res.msg)
        }
      })
    }
  }
}
</script>
