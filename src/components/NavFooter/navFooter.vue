<!-- 组件：footer -->
<template>
  <div class="nav-footer">
    © 2018 junyong.hong 闽ICP备17030744号-1
    <a v-if="!userId" @click="mdShow = true" href="javascript:;">管理员登录</a>
    <a v-if="userId" href="/#/admin">后台管理</a>
    <a v-if="userId" @click="logOut" href="javascript:;">退出</a>

    <!-- 模态框：登录 -->
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <div slot="message">
        <p>
          <label for="userName">帐号：</label>
          <input v-model="userName" id="userName" name="userName" type="text" placeholder="管理员账号">
        </p>
        <p>
          <label for="userPwd">密码：</label>
          <input v-model="userPwd" id="userPwd" name="userPwd" type="password" placeholder="密码">
        </p>
      </div>
      <div slot="btnGroup">
        <a href="javascript:;" @click="login">登录</a>
      </div>
    </modal>
  </div>
</template>
<style lang="scss">
  /* footer样式 */
  @import "navFooter.scss";
</style>
<script>
// 模态框
import Modal from '@/components/modal/modal.vue'
// axios
import axios from 'axios'
export default {
  data () {
    return {
      // 模态框：登录
      mdShow: false,
      // 帐号
      userName: '',
      // 密码
      userPwd: '',
      // 管理员id
      userId: ''
    }
  },
  mounted () {
    // 刷新页面就会调用
    this.checkLogin()
  },
  computed: {

  },
  components: {
    Modal
  },
  methods: {
    /**
     * 管理员登录
     */
    login () {
      axios.post('/admin/login', {
        userName: this.userName,
        userPwd: this.userPwd
      }).then((response) => {
        var res = response.data

        if (res.status === '0') {
          this.userId = res.result.userId
          this.closeModal()
        }
      })
    },
    /**
     * 检测是否登录
     */
    checkLogin () {
      axios.get('/admin/checkLogin').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.userId = res.result
        }
        // else {
        //  if (this.$route.path !== '/index') {
        //    this.$router.push('/index')
        //  }
        // }
      })
    },
    /**
     * 退出
     */
    logOut () {
      axios.post('/admin/logout').then((response) => {
        let res = response.data
        if (res.status === '0') {
          this.userId = ''
        }
      })
    },
    /**
     * 关闭模态框
     */
    closeModal () {
      this.mdShow = false
    }
  }
}
</script>
