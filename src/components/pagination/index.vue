<template lang="pug">
  .pagination
    .page__list(@click="handlePage(paginationData.current_page - 1, paginationData.has_pre)" :class="{ disabled: paginationData.has_pre === false }") <
    .page__list(
      v-for="node in paginationData.total_pages"
      :key="node"
      :class="{active: paginationData.current_page === node}"
      @click="handlePage(node)"
    ) {{ node }}
    .page__list(@click="handlePage(paginationData.current_page + 1, paginationData.has_next)" :class="{ disabled: paginationData.has_next === false }") >
</template>

<script>
export default {
  name: 'pagination',
  props: {
    paginationData: Object
  },
  data () {
    return {}
  },
  methods: {
    handlePage (val, item) {
      if (item === false) return false
      else this.$emit('getPage', val)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import './style';
</style>
