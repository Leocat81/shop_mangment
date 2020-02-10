<template>
  <div>
    文章分类：
      <select v-model="selected" name="" id="">
        <option v-for="item in categoryList" :value="item._id" v-bind:key="item.id" >
          {{item.name}}
        </option>
      </select>
    <br/>
    标题：<input v-model="title" type="text" ><br/>
    简介：<textarea v-model="description"></textarea><br/>
    内容：
    <!--<textarea v-model="content"></textarea><br/>-->
    <div class="indexContainer">
      <div class="btnsContainer">
        <div class="btn" @click="getMdValueFn">获取mdValue</div>
        <div class="btn" @click="getHtmlValueFn">获取htmlValue</div>
      </div>
      <div class="maskContainer" v-if="dilogStatus">
        <div class="contentContainer">
          <div class="closeBtnContainer" @click="closeMaskFn"></div>
          <textarea class="showAreaContainer" v-model="msgShow" readonly></textarea>
        </div>
      </div>
      <div class="editorContainer">
        <markdown
          :mdValuesP="content"
          :fullPageStatusP="false"
          :editStatusP="true"
          :previewStatusP="true"
          :navStatusP="true"
          :icoStatusP="true"
          @childevent="childEventHandler"
        ></markdown>
        <!--变量后面的大写P表示是从父组件中传入的参数-->
        <!--:mdValuesP="msg" 表示需要初始化传入编辑器的内容-->
        <!--:fullPageStatusP="false" 加载时是否全屏（true全屏/false跟随父容器）-->
        <!--:editStatusP="false" 加载时是否显示编辑容器（true显示/false不显示）-->
        <!--:previewStatusP="false" 加载时是否显示预览容器（true全屏/false不显示）-->
        <!--:navStatusP="false" 加载时是否显示顶部快速标签栏（true显示/false不显示）-->
        <!--@childevent="childEventHandler" 监听组件的$.emit()方法传回父组件的值，便于父容器保存获取-->
      </div>
    </div>
    <button @click="submitFn(2)">保存草稿</button>
    <button @click="submitFn(0)">提交</button>
  </div>
</template>
<style lang="scss" scoped>
  @import "articleAdd.scss";
</style>
<script>
// axios
import axios from 'axios'
import markdown from '@/components/markdown/markdown'
export default {
  data () {
    return {
      // 所有分类
      categoryList: '',
      // 选中的分类
      selected: '',
      // 标题
      title: '',
      // 简介
      description: '',
      // 内容
      content: '## 默认值',
      // 文章的id
      articleId: '',
      // markdown弹窗内容
      msgShow: '我要显示的内容',
      // markdown默认不显示弹窗
      dilogStatus: false,
      // markdown内容
      msg: {
        mdValue: '## Vue-markdownEditor'
      }
    }
  },
  mounted () {
    this.init()
  },
  components: {
    markdown
  },
  watch: {
    /**
     * 路由改变，清空参数
     * @param to
     * @param from
     */
    '$route' (to, from) {
      if (to !== from) {
        this.articleId = ''
        this.title = ''
        this.description = ''
        this.content = ''
      }
    }
  },
  methods: {
    init () {
      /**
       * 如果有文章的id，就请求对应的内容
       */
      var articleId = this.$route.query.articleId
      if (articleId !== undefined) {
        this.articleId = articleId
        axios.post('/admin/articleFindOne', {
          articleId: articleId
        }).then((response) => {
          var res = response.data

          if (res.status === '0') {
            this.title = res.result.title
            this.content = res.result.content
            this.description = res.result.description
            this.selected = res.result.category
          }
        })
      }

      /**
       * 获取分类
       */
      axios.get('/admin/categoryList').then((response) => {
        var res = response.data
        this.categoryList = res.result.list

        if (articleId === undefined) {
          // 第一个分类类型
          if (res.result.list[0]._id) {
            this.selected = res.result.list[0]._id
          }
        }
      })
    },
    /**
     * 判断 添加文章 还是 新增文章
     */
    submitFn (articleStatus) {
      if (this.articleId) {
        // 修改文章--保存
        this.articleEdit(articleStatus)
      } else {
        // 添加文章
        this.articleAdd(articleStatus)
      }
    },
    /**
     * 添加文章
     */
    articleAdd (articleStatus) {
      axios.post('/admin/articleAdd', {
        category: this.selected,
        title: this.title,
        description: this.description,
        // 内容为markdown格式
        content: this.content,
        // 文章状态（0代表上架、1代表下架、2代表保存成草稿）
        articleStatus: articleStatus
      }).then((response) => {
        var res = response.data

        if (res.status === '0') {
          alert('添加成功')

          // 分类数量加1
          axios.post('/admin/categoryNumber', {
            categoryId: this.selected,
            categoryFlag: 'add'
          }).then((response) => {
          })
        } else {
          alert('添加失败，网络异常')
        }
      })
    },
    /**
     * 修改文章--保存
     */
    articleEdit (articleStatus) {
      axios.post('/admin/articleEdit', {
        articleId: this.articleId,
        categoryId: this.selected,
        title: this.title,
        description: this.description,
        content: this.content,
        articleStatus: articleStatus
      }).then((response) => {
        var res = response.data
        if (res.status === '0') {
          alert('修改成功~')
        }
      })
    },

    childEventHandler (res) {
      // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
      // this.msg = res
      this.content = res.mdValue
    },
    getMdValueFn () {
      this.msgShow = this.msg.mdValue
      this.dilogStatus = true
    },
    getHtmlValueFn () {
      this.msgShow = this.msg.htmlValue
      this.dilogStatus = true
    },
    closeMaskFn () {
      this.msgShow = ''
      this.dilogStatus = false
    }
  }

}
</script>
