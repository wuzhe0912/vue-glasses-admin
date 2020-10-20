<template lang="pug">
  .home__wrap
    bodyHeader
    .content
      navMenu
      .content__right(:class="{no__padding: $route.name === 'home-container'}")
        router-view
</template>

<script>
import bodyHeader from '@/components/body-header'
import navMenu from '@/components/nav-menu'

export default {
  name: 'home',
  components: {
    bodyHeader,
    navMenu
  },

  data () {
    return {
    }
  },

  created () {
    const cookieValue = document.cookie.split('; ').find(row => row.startsWith('token')).split('=')[1]
    this.$http.defaults.headers.common.Authorization = cookieValue
  },

  methods: {}
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
