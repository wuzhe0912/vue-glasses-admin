<template lang="pug">
  .products__wrap(v-loading="loading")
    .product__title
      el-button(type="primary" plain @click="handleAdd()") + 建立新產品
    .products__table
      el-table(
        v-if="productList.length > 0"
        :data="productList"
        style="width: 100%"
      )
        el-table-column(label="序號" type="index" align='center' width="60")
        el-table-column(label="分類" width="120")
          template(slot-scope="scope")
            span {{ scope.row.category }}
        el-table-column(label="名稱" width="240")
          template(slot-scope="scope")
            span {{ scope.row.title }}
        el-table-column(label="原價" width="240" align="right")
          template(slot-scope="scope")
            span {{ scope.row.origin_price | currency | dollarSign }}
        el-table-column(label="售價" width="240" align="right")
          template(slot-scope="scope")
            span {{ scope.row.price | currency | dollarSign }}
        el-table-column(label="是否啟用" width="80" align="center")
          template(slot-scope="scope")
            span.enabled__txt(:class="{ isEnable: scope.row.is_enabled === 1 }") {{ formatter(scope.row.is_enabled) }}
        el-table-column(label="操作" width="200" align="center")
          template(slot-scope="scope")
            el-button(size="mini" @click="handleEdit(scope.$index, scope.row)") 編輯
            el-button(v-loading="loading" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)") 刪除
      pagination(:paginationData="paginationData" @getPage="getPage")
    productsDialog(:dialog="dialog" :formData="formData" @update="getProductList")
</template>

<script>
import productsDialog from '@/components/products-dialog'
import pagination from '@/components/pagination'

export default {
  name: 'products',
  components: {
    productsDialog,
    pagination
  },
  data () {
    return {
      loading: false,
      productList: [],
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
    this.getProductList()
  },
  methods: {
    init () {
      this.formData = {
        title: '',
        category: '',
        origin_price: '',
        price: '',
        unit: '',
        description: '',
        content: '',
        // image: '',
        is_enabled: 1
      }
    },
    getProductList (page = 1) {
      this.loading = true
      let api = `${this.axios.defaults.validBaseURL}/admin/products?page=${page}`
      this.$http.get(api).then((res) => {
        this.productList = res.products
        this.paginationData = res.pagination
        this.loading = false
      }).catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    handleAdd () {
      this.init()
      this.dialog = {
        show: true,
        title: '建立新',
        option: 'add'
      }
    },
    handleEdit (index, row) {
      this.dialog = {
        show: true,
        title: '編輯',
        option: 'edit'
      }
      this.formData = row
    },
    handleDelete (index, row) {
      this.loading = true
      let api = `${this.axios.defaults.validBaseURL}/admin/product/${row.id}`
      this.$http.delete(api).then((res) => {
        this.$message({ message: '刪除成功', type: 'success' })
        this.loading = false
        this.getProductList()
      }).catch((err) => {
        console.log(err)
        this.loading = false
      })
    },
    formatter (val) {
      if (val === 1) return '啟用'
      else if (val === 0) return '未啟用'
      else return ''
    },
    getPage (val) {
      this.getProductList(val)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import './style';
</style>
