<template>
  <div>
    分类列表
    <table border="1">
      <thead>
        <tr>
          <th>分类ID</th>
          <th>名称</th>
          <th>数量</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in categoryListData" v-bind:key="item.key">
          <th>{{item._id}}</th>
          <th>{{item.name}}</th>
          <th>{{item.count}}</th>
          <th>
            <a @click="categoryDel(item._id)" href="javascript:;">删除</a>
            <a @click="categoryEdit(item._id)" href="javascript:;">修改</a>
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
      // 分类列表数据
      categoryListData: ''
    }
  },
  mounted: function () {
    this.init()
  },
  methods: {
    init () {
      /**
       * 获取分类所有数据
       */
      // 测试axios二次封装get请求
      // this.$get('/admin/categoryList').then((res) => {
      //  console.log(res)
      // })
      axios.get('/admin/categoryList').then((response) => {
        var res = response.data.result
        this.categoryListData = res.list
      })
    },
    /**
     * 删除分类
     * @param categoryId 分类的id
     */
    categoryDel (categoryId) {
      var flag = confirm('是否确定要删除？')
      if (flag) {
        axios.post('/admin/categoryDel', {
          categoryId: categoryId
        }).then((response) => {
          let res = response.data
          if (res.status === '0') {
            this.init()
          } else {
            alert(res.msg)
          }
        })
      }
    },
    /**
     * 修改分类
     * @param categoryId 分类的id
     */
    categoryEdit (categoryId) {
      this.$router.push({
        path: '/admin/categoryAdd',
        query: {categoryId: categoryId}
      })
    }
  }
}
</script>
