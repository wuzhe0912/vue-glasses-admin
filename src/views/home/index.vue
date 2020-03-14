<template lang="pug">
  .home__wrap
    bodyHeader
    .content
      navMenu
      .content__right
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
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
