<template lang="pug">
  .home__wrap(@click="logout()") logout
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
    }
  },
  methods: {
    logout () {
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
