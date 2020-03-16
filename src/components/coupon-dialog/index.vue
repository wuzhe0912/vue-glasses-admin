<template lang="pug">
  .dialog__wrap
    el-dialog(
      :title="dialog.title"
      :visible.sync="dialog.show"
    )
      .form__wrap
        el-form(
          :model="formData"
          :rules="rules"
          ref="updateCouponForm"
          label-width="120px"
        )
          el-form-item(label="優惠卷名稱" prop="title")
            el-input(v-model="formData.title" autocomplete="off")
          el-form-item(label="優惠價格" prop="percent")
            el-input(v-model="formData.percent" autocomplete="off")
          el-form-item(label="截止時間" prop="due_date")
            el-input(v-model="formData.due_date" autocomplete="off")
          el-form-item(label="是否啟用" prop="is_enabled")
            el-select(v-model="formData.is_enabled" placeholder="請選擇是否啟用")
              el-option(label="啟用" :value="1")
              el-option(label="不啟用" :value="0")
      .dialog-footer(slot="footer")
        el-button(@click="dialog.show = false") 取 消
        el-button(v-loading="loading" type="primary" @click="submit('updateCouponForm')") 送 出
</template>

<script>
export default {
  name: 'coupon-dialog',
  props: {
    dialog: Object,
    formData: Object
  },
  data () {
    return {
      loading: false,
      rules: {
        title: [{
          required: true,
          message: '不可為空',
          trigger: 'blur'
        }],
        percent: [{
          required: true,
          message: '不可為空',
          trigger: 'blur'
        }],
        due_date: [{
          required: true,
          message: '不可為空',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submit (val) {
      this.$refs[val].validate(valid => {
        if (valid) {
          this.loading = true
          let api = `${this.axios.defaults.validBaseURL}/admin/coupon`
          let httpMethod = 'post'
          let option = this.dialog.option
          let id = this.formData.id
          // 檢查是新增 || 編輯
          if (option === 'edit') {
            httpMethod = 'put'
            api = `${this.axios.defaults.validBaseURL}/admin/coupon/${id}`
          }
          this.$http[httpMethod](api, { data: this.formData }).then((res) => {
            this.loading = false
            this.dialog.show = false
            if (option === 'add') {
              this.$message({ message: '新增優惠卷成功', type: 'success' })
            } else this.$message({ message: '優惠卷修改成功', type: 'success' })
            // 傳遞到父組件，並重取一次產品列表
            this.$emit('update')
          }).catch((err) => {
            this.loading = false
            console.log(err)
          })
        } else this.$message.error('請再次檢查欄位是否未填寫')
      })
    }
  }
}

</script>

<style lang="scss" scoped>
  @import './style';
</style>
