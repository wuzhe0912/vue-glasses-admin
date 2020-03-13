<template lang="pug">
  .login__wrap
    section.container
      .title CMS
      el-form(:model="formData" :rules="rules" ref="loginForm")
        el-form-item(label="Email" prop="username")
          el-input(v-model="formData.username" placeholder="請輸入Email")
        el-form-item(label="密碼" prop="password")
          el-input(v-model="formData.password" placeholder="請輸入密碼" type="password")
        el-form-item
          el-button.submit__btn(v-loading="loading" type="primary" @click="submitLogin('loginForm')") 登入
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  components: {},
  data () {
    return {
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [{
          type: 'email',
          required: true,
          message: 'Email 格式不正確',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密碼欄位不可為空',
          trigger: 'blur'
        }]
      },
      loading: false
    }
  },

  methods: {
    submitLogin (val) {
      this.$refs[val].validate(valid => {
        // 檢查有無填入登入資訊
        if (valid) {
          this.loading = true
          let api = `${this.axios.defaults.baseURL}/admin/signin`
          this.$http.post(api, this.formData).then((res) => {
            if (res.success === true) {
              this.$message({ message: '登入成功', type: 'success' })
              this.$router.push({ name: 'home' })
            } else this.$message.error('登入失敗')
            this.loading = false
          }).catch(() => {
            this.loading = false
            this.$message.error('登入失敗')
          })
        } else return false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import './style';
</style>
