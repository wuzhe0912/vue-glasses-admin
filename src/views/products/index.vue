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
        el-table-column(label="原價" width="240")
          template(slot-scope="scope")
            span {{ scope.row.origin_price }}
        el-table-column(label="售價" width="240")
          template(slot-scope="scope")
            span {{ scope.row.price }}
        el-table-column(label="是否啟用" width="80")
          template(slot-scope="scope")
            span {{ formatter(scope.row.is_enabled) }}
        el-table-column(label="操作" width="200")
          template(slot-scope="scope")
            el-button(size="mini" @click="handleEdit(scope.$index, scope.row)") 編輯
            el-button(size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)") 刪除
    productsDialog(:dialog="dialog" @update="getProductList")
</template>

<script>
import productsDialog from '@/components/products-dialog'

export default {
  name: 'products',
  components: {
    productsDialog
  },
  data () {
    return {
      loading: false,
      productList: [],
      dialog: {
        show: false
      }
    }
  },
  created () {
    this.getProductList()
  },
  methods: {
    getProductList () {
      this.loading = true
      let api = `${this.axios.defaults.validBaseURL}/admin/products`
      this.$http.get(api).then((res) => {
        this.productList = res.products
        this.loading = false
      }).catch((err) => {
        this.loading = false
        console.log(err)
      })
    },
    handleAdd () {
      this.dialog.show = true
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
    },
    formatter (val) {
      if (val === 1) return '啟用'
      else if (val === 0) return '未啟用'
      else return ''
    }
  }
}

</script>

<style lang="scss" scoped>
  @import './style';
</style>
