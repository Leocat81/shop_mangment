import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// 首页
import index from '@/views/main/index/index'
// 博客
import blog from '@/views/main/blog/blog'
// 分类
import categories from '@/views/main/categories/categories'
// 查看文章详情
import artDetail from '@/views/main/artDetail/artDetail'
// 关于
import about from '@/views/main/about/about'

// 后台
import admin from '@/views/admin/index/index'
// 后台仪表盘
import dashboard from '@/views/admin/dashboard/dashboard'
// 添加文章
import articleAdd from '@/views/admin/article/articleAdd/articleAdd'
// 文章列表
import articleList from '@/views/admin/article/articleList/articleList'
// 添加分类
import categoryAdd from '@/views/admin/category/categoryAdd/categoryAdd'
// 分类列表
import categoryList from '@/views/admin/category/categoryList/categoryList'

Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'index',
      component: index
    },
    // 没有登录，跳转到首页
    {
      path: '/index',
      name: 'unlogin index',
      component: index
    },
    // 分类
    {
      path: '/categories',
      name: 'categories',
      component: categories
    },
    // 查看文章详情
    {
      path: '/artDetail',
      name: 'artDetail',
      component: artDetail
    },
    // 博客
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    // 关于
    {
      path: '/about',
      name: 'about',
      component: about
    },
    // 后台
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      redirect: '/admin/dashboard',
      children: [
        // 仪表盘
        {
          path: 'dashboard',
          name: 'dashboard',
          component: dashboard
        },
        // 添加分类
        {
          path: 'categoryAdd',
          name: 'categoryAdd',
          component: categoryAdd
        },
        // 获取所有分类
        {
          path: 'categoryList',
          name: 'categoryList',
          component: categoryList
        },
        // 添加文章
        {
          path: 'articleAdd',
          name: 'articleAdd',
          component: articleAdd
        },
        // 文章列表
        {
          path: 'articleList',
          name: 'articleList',
          component: articleList
        }
      ]
    }
  ]
})
