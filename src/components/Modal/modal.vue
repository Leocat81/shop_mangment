<!-- 组件：模态框 -->
<template>
  <div>
    <div v-bind:class="[mdShow ? '':'hidden']" class="md-modal">
      <div class="">
        <div class="">
          <button @click="closeModal" class="">关闭</button>
        </div>
        <div class="">
          <div class="">
            <!-- 内容 -->
            <slot name="message"></slot>
          </div>
          <div class="">
            <!-- 按钮 -->
            <slot name="btnGroup"></slot>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-if="mdShow" @click="closeModal"></div>
  </div>
</template>
<style lang="scss">
  @import "modal.scss";
</style>
<script>
export default {
  // 接收父组件传递过来的参数
  props: ['mdShow'],
  methods: {
    /**
     * 关闭模态框
     */
    closeModal () {
      // 触发父组件的v-bind:close也就会调用closeModal方法
      this.$emit('close')
    }
  }
}
</script>
