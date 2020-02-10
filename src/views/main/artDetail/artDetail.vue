<template>
  <div>
    <nav-header></nav-header>

    <div class="index-container">
      <div class="index-container-center">
        <div class="center-left">

          <h2 style="text-align: center;">{{ articleData.title }}</h2>
          <p>
            时间: <span>{{ articleData.addTime }}</span>
            阅读: <span>{{ articleData.views }}</span>
            评论: <span></span>
          </p>
          <div v-html="compiledMarkdown" class="compiledMarkdown"></div>
          <div>
            <p v-if="articlePreviousHidden === false">
              上一篇
              <router-link v-bind:to="{path: '/artDetail', query: {articleId: articlePreviousData._id}}">{{ articlePreviousData.title }}</router-link>
            </p>
            <p v-if="articleNextHidden == false">
              下一篇
              <router-link v-bind:to="{path: '/artDetail', query: {articleId: articleNextData._id}}">{{ articleNextData.title }}</router-link>
            </p>
          </div>
        </div>
        <div class="center-right">
          <div>
            文章导航
            <div class="artDetail-nav">

            </div>
          </div>
        </div>
      </div>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>
<style lang="scss">
  @import "../index/index.scss";
  /*@import "theme-markdowncss_github_style_blue_by_jwsky_preview.css";*/
  /*导航*/
  .BlogAnchor {
    background: #f1f1f1;
    padding: 10px;
    line-height: 180%;
    position: fixed;
    right: 48px;
    top: 90px;
    border: 1px solid #aaaaaa;
  }
  .BlogAnchor p {
    font-size: 18px;
    color: #15a230;
    margin: 0 0 0.3rem 0;
    text-align: right;
  }
  .BlogAnchor .AnchorContent {
    padding: 5px 0px;
    overflow: auto;
  }
  .BlogAnchor li{
    text-indent: 0.5rem;
    font-size: 14px;
    list-style: none;
  }
  .BlogAnchor li .nav_item{
    padding: 3px;
  }
  .BlogAnchor li .item_h1{
    margin-left: 0rem;
  }
  .BlogAnchor li .item_h2{
    margin-left: 2rem;
    font-size: 0.8rem;
  }
  .BlogAnchor li .nav_item.current{
    color: white;
    background-color: #5cc26f;
  }
  .BlogAnchor a:hover {
    color: #5cc26f;
  }
  .BlogAnchor a {
    text-decoration: none;
  }
</style>
<script>
// 头部
import NavHeader from '@/components/navHeader/navHeader.vue'
// footer
import NavFooter from '@/components/navFooter/navFooter.vue'
// axios
import axios from 'axios'
import marked from 'marked'

export default {
  data () {
    return {
      // 文章信息
      articleData: '',
      // 文章内容
      articleContent: '',
      // markdown转成HTML
      articleContentHtml: '',
      // 上一篇文章的数据
      articlePreviousData: '',
      // 判断是否有上一篇文章的数据
      articlePreviousHidden: false,
      // 下一篇文章的数据
      articleNextData: '',
      // 判断是否有下一篇文章的数据
      articleNextHidden: false
    }
  },
  mounted () {
    this.init()
  },
  watch: {
    '$route' (to, from) {
      if (to !== from) {
        this.init()
      }
    }
  },
  components: {
    NavHeader,
    NavFooter
  },
  methods: {
    init () {
      /**
       * 根据文章id，查询文章具体内容
       */
      var articleId = this.$route.query.articleId
      axios.post('/index/artDetail', {
        articleId: articleId
      }).then((response) => {
        var res = response.data

        if (res.status === '0') {
          this.articleData = res.result
          this.articleContent = res.result.content
          this.articlePrevious(articleId)
          this.articleNext(articleId)

          setTimeout(() => {
            this.navTitle()
          }, 500)
        } else {
          alert('请求错误~')
        }
      })
    },
    /**
     * 上一篇文章
     * @param articleId 当前文章的id
     */
    articlePrevious (articleId) {
      axios.post('/index/articlePrevious', {
        articleId: articleId
      }).then((response) => {
        var res = response.data
        if (res.status === '2') {
          this.articlePreviousHidden = true
        } else if (res.status === '0') {
          this.articlePreviousHidden = false
          this.articlePreviousData = res.result[0]
        }
      })
    },
    /**
     * 下一篇文章
     * @param articleId 当前文章的id
     */
    articleNext (articleId) {
      axios.post('/index/articleNext', {
        articleId: articleId
      }).then((response) => {
        var res = response.data
        if (res.status === '2') {
          this.articleNextHidden = true
        } else if (res.status === '0') {
          this.articleNextHidden = false
          this.articleNextData = res.result[0]
        }
      })
    },
    /**
     * 根据markdown生成目录
     */
    navTitle () {
      var h1s = $('.compiledMarkdown').find('h1')
      var h2s = $('.compiledMarkdown').find('h2')
      var h3s = $('.compiledMarkdown').find('h3')
      var h4s = $('.compiledMarkdown').find('h4')
      var h5s = $('.compiledMarkdown').find('h5')
      var h6s = $('.compiledMarkdown').find('h6')

      var headCounts = [h1s.length, h2s.length, h3s.length, h4s.length, h5s.length, h6s.length]
      var vH1Tag = null
      var vH2Tag = null
      for (var i = 0; i < headCounts.length; i++) {
        if (headCounts[i] > 0) {
          console.log(vH1Tag)
          if (vH1Tag === null) {
            vH1Tag = 'h' + (i + 1)
          } else {
            vH2Tag = 'h' + (i + 1)
          }
        }
      }
      if (vH1Tag === null) {
        return
      }

      $('.artDetail-nav').prepend(
        '<div class="BlogAnchor">' +
          '<div class="AnchorContent" id="AnchorContent"></div>' +
        '</div>')

      // var vH1Index = 0
      // var vH2Index = 0
      $('.compiledMarkdown').find('h1,h2,h3,h4,h5,h6').each(function (i, item) {
        // var id = ''
        // var name = ''
        var tag = $(item).get(0).tagName.toLowerCase()
        var className = ''
        console.log(tag)
        if (tag === vH1Tag) {
          // id = name = ++vH1Index
          // name = id
          // vH2Index = 0
          className = 'item_h1'
        } else if (tag === vH2Tag) {
          // id = vH1Index + '_' + ++vH2Index
          // name = vH1Index + '.' + vH2Index
          className = 'item_h2'
        }
        // $(item).attr('id', 'wow' + id)
        $(item).addClass('wow_head')
        $('#AnchorContent').css('max-height', ($(window).height() - 500) + 'px')

        $('#AnchorContent').append(
          '<li>' +
            '<a class="nav_item ' + className + ' anchor-link" link="' + $(item).attr('id') + '" href="#' + $(item).attr('id') + '">' + $(this).text() + '</a>' +
          '</li>'
        )
      })
      $('.anchor-link').click(function () {
        $('html').animate({
          scrollTop: $('#' + $(this).attr('link')).offset().top
        }, 500)
      })

      var headerNavs = $('.BlogAnchor li .nav_item')
      var headerTops = []
      $('.wow_head').each(function (i, n) {
        headerTops.push($(n).offset().top)
      })

      $(window).scroll(function () {
        var scrollTop = $(window).scrollTop()
        $.each(headerTops, function (i, n) {
          var distance = n - scrollTop
          if (distance >= 0) {
            $('.BlogAnchor li .nav_item.current').removeClass('current')
            $(headerNavs[i]).addClass('current')
            return false
          }
        })
      })
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.articleContent, { sanitize: true })
    }
  }
}
</script>
