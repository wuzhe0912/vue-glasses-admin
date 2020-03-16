<template lang="pug">
  .dialog__wrap
    //- visible 隱藏或顯示
    el-dialog(
      :title="dialog.title + '產品'"
      :visible.sync="dialog.show"
    )
      .form__wrap
        el-form(
          :model="formData"
          :rules="rules"
          ref="updateProductForm"
          label-width="120px"
        )
          el-form-item(label="產品名稱" prop="title")
            el-input(v-model="formData.title" autocomplete="off")
          el-form-item(label="分類" prop="category")
            el-input(v-model="formData.category" autocomplete="off")
          el-form-item(label="原價" prop="origin_price")
            el-input(v-model="formData.origin_price" autocomplete="off")
          el-form-item(label="售價" prop="price")
            el-input(v-model="formData.price" autocomplete="off")
          el-form-item(label="單位" prop="unit")
            el-input(v-model="formData.unit" autocomplete="off")
          el-form-item(label="產品描述" prop="description")
            el-input(v-model="formData.description" autocomplete="off")
          el-form-item(label="說明內容" prop="content")
            el-input(v-model="formData.content" autocomplete="off")
          el-form-item(label="是否啟用" prop="is_enabled")
            el-select(v-model="formData.is_enabled" placeholder="請選擇是否啟用")
              el-option(label="啟用" :value="1")
              el-option(label="不啟用" :value="0")
      .dialog-footer(slot="footer")
        el-button(@click="dialog.show = false") 取 消
        el-button(v-loading="loading" type="primary" @click="submit('updateProductForm')") 送 出
</template>

<script>
export default {
  name: 'products-dialog',
  props: {
    // 接受父組件傳來的狀態
    dialog: Object,
    formData: Object
  },
  data () {
    return {
      rules: {
        title: [{
          required: true,
          message: '不可為空',
          trigger: 'blur'
        }],
        category: [{
          required: true,
          message: '不可為空',
          trigger: 'blur'
        }],
        origin_price: [{
          required: true,
          message: '不可為空',
          trigger: 'blur'
        }],
        price: [{
          required: true,
          message: '不可為空',
          trigger: 'blur'
        }],
        unit: [{
          required: true,
          message: '不可為空',
          trigger: 'blur'
        }],
        description: [{
          required: true,
          message: '不可為空',
          trigger: 'blur'
        }],
        content: [{
          required: true,
          message: '不可為空',
          trigger: 'blur'
        }]
      },
      loading: false
    }
  },
  methods: {
    submit (val) {
      this.$refs[val].validate(valid => {
        if (valid) {
          this.loading = true
          let api = `${this.axios.defaults.validBaseURL}/admin/product`
          let httpMethod = 'post'
          let option = this.dialog.option
          let id = this.formData.id
          // 檢查是新增 || 編輯
          if (option === 'edit') {
            httpMethod = 'put'
            api = `${this.axios.defaults.validBaseURL}/admin/product/${id}`
          }
          this.$http[httpMethod](api, { data: this.formData }).then((res) => {
            this.loading = false
            this.dialog.show = false
            if (option === 'add') {
              this.$message({ message: '產品添加成功', type: 'success' })
            } else this.$message({ message: '產品修改成功', type: 'success' })
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
