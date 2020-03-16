<template lang="pug">
  .form__wrap(v-loading="loading")
    .form__title
      el-button(type="primary" plain @click="handleAdd()") + 新增優惠卷
    .form__table
      el-table(
        v-if="couponList.length > 0"
        :data="couponList"
        style="width: 100%"
      )
        el-table-column(label="序號" type="index" align='center' width="60")
        el-table-column(label="優惠卷名稱" width="120")
          template(slot-scope="scope")
            span {{ scope.row.title }}
        el-table-column(label="截止時間" width="200")
          template(slot-scope="scope")
            span {{ scope.row.due_date }}
        el-table-column(label="優惠價格" width="240" align="right")
          template(slot-scope="scope")
            span {{ scope.row.percent | currency | dollarSign }}
        el-table-column(label="是否啟用" width="80" align="center")
          template(slot-scope="scope")
            span.enabled__txt(:class="{ isEnable: scope.row.is_enabled === 1 }") {{ formatter(scope.row.is_enabled) }}
        el-table-column(label="操作" width="200" align="center")
          template(slot-scope="scope")
            el-button(size="mini" @click="handleEdit(scope.$index, scope.row)") 編輯
            el-button(v-loading="loading" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)") 刪除
      pagination(:paginationData="paginationData" @getPage="getPage")
    couponDialog(:dialog="dialog" :formData="formData" @update="getCouponList")
</template>

<script>
import couponDialog from '@/components/coupon-dialog'
import pagination from '@/components/pagination'

export default {
  name: 'coupon',
  components: {
    couponDialog,
    pagination
  },
  data () {
    return {
      loading: false,
      couponList: [],
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
    this.getCouponList()
  },
  methods: {
    init () {
      this.formData = {}
    },
    getCouponList (page = 1) {
      this.loading = true
      let api = `${this.axios.defaults.validBaseURL}/admin/coupons?page=${page}`
      this.$http.get(api).then((res) => {
        console.log(1, res)
        this.couponList = res.coupons
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
        title: '新增優惠卷',
        option: 'add'
      }
    },
    handleEdit (index, row) {
      this.dialog = {
        show: true,
        title: '編輯優惠卷',
        option: 'edit'
      }
      this.formData = row
    },
    handleDelete (index, row) {
      this.loading = true
      let api = `${this.axios.defaults.validBaseURL}/admin/coupon/${row.id}`
      this.$http.delete(api).then((res) => {
        this.$message({ message: '刪除成功', type: 'success' })
        this.loading = false
        this.getCouponList()
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
      this.getCouponList(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
