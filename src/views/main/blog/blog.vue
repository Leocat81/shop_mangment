<template>
  <div>
    <nav-header></nav-header>
      blog
    <nav-footer></nav-footer>
  </div>
</template>
<style>

</style>
<script>
// 头部
import NavHeader from '@/components/navHeader/navHeader.vue'
// footer
import NavFooter from '@/components/navFooter/navFooter.vue'
// axios
// import axios from 'axios'
export default {
  data () {
    return {}
  },
  mounted () {

  },
  components: {
    NavHeader,
    NavFooter
  },
  methods: {}
}
</script>
