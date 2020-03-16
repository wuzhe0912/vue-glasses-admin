<template lang="pug">
  .nav__container
    .logo__container
      .logo
      .title Business CMS
    .userInfo
      .avatar
      .name__wrap
        p.name.come 歡迎
        p.name.avatar__name 無名der使用者
      .drop__wrap
        el-dropdown(trigger="click" @command="setInfo")
          span.el-dropdown-link
            i.el-icon-arrow-down.el-icon--right
          el-dropdown-menu(slot="dropdown")
            el-dropdown-item(command="logout") 登出
</template>

<script>
export default {
  name: 'body-header',
  data () {
    return {
    }
  },
  methods: {
    setInfo () {
      let api = `${this.axios.defaults.baseURL}/logout`
      this.$http.post(api).then((res) => {
        this.$message({ message: res.message, type: 'success' })
        this.$router.push({ name: 'login' })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
