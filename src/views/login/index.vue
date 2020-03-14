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
import { mapState, mapActions } from 'vuex'

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

  computed: {
    ...mapState([
      'userInfo'
    ])
  },

  created () {
    // 檢查狀態是否為已登入，若為登入狀態則進入 home
    this.getUserStatus().then(() => {
      if (this.userInfo.status) this.$router.push({ name: 'home-container' })
    })
  },

  methods: {
    ...mapActions([
      'getUserStatus'
    ]),
    submitLogin (val) {
      this.$refs[val].validate(valid => {
        // 檢查有無填入登入資訊
        if (valid) {
          this.loading = true
          let api = `${this.axios.defaults.baseURL}/admin/signin`
          this.$http.post(api, this.formData).then((res) => {
            if (res.success === true) {
              this.$router.push({ name: 'home-container' })
              this.$message({ message: '登入成功', type: 'success' })
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
