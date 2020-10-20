<template lang="pug">
  .form__wrap(v-loading="loading")
    .form__table
      el-table(
        v-if="ordersList.length > 0"
        :data="ordersList"
        style="width: 100%"
      )
        el-table-column(label="序號" type="index" align='center' width="60")
        el-table-column(label="分類" width="120")
          template(slot-scope="scope")
            //- span {{ scope.row.category }}
        el-table-column(label="名稱" width="240")
          template(slot-scope="scope")
            //- span {{ scope.row.title }}
</template>

<script>
export default {
  name: 'orders',
  components: {},
  data () {
    return {
      loading: false,
      ordersList: [],
      formData: {},
      dialog: {
        show: false,
        title: '',
        option: ''
      },
      paginationData: {}
    }
  },
  created () {
    this.init()
    this.getOrederList()
  },
  methods: {
    init () {
      this.formData = {}
    },
    getOrederList (page = 1) {
      this.loading = true
      let api = `${this.axios.defaults.validBaseURL}/admin/orders?page=${page}`
      this.$http.get(api).then((res) => {
        this.ordersList = res.orders
        this.paginationData = res.pagination
        this.loading = false
      }).catch((err) => {
        this.loading = false
        console.log(err)
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  @import './style';
</style>
