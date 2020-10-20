<template lang="pug">
  el-row.menu__page
    el-col
      el-menu.menu__list(
        class="el-menu-vertical-demo"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
      )
        template(v-for="node in menuList")
          router-link(:to="{ name: node.path }" )
            el-menu-item(:key="node.path")
              i(:class="'el-icon-' + node.icon")
              span(slot="title") {{ node.name }}

</template>

<script>
export default {
  name: 'nav-menu',

  data () {
    return {
      menuList: [
        // {
        //   icon: 'location',
        //   name: '首頁',
        //   path: 'home-container'
        // },
        {
          icon: 'menu',
          name: '產品管理',
          path: 'products'
        },
        // {
        //   icon: 'document',
        //   name: '訂單管理',
        //   path: 'orders'
        // },
        {
          icon: 'setting',
          name: '優惠卷',
          path: 'coupon'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
