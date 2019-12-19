<template>
  <div class="homebgc">
    <el-card class="card">
      <div style="text-align:center">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <el-form :model="loginFrom" :rules="loginRoles" ref="myFrom">
        <el-form-item prop="mobile">
          <!-- 登录手机号 -->
          <el-input
            class="phone"
            placeholder="手机号"
            v-model="loginFrom.mobile"
          ></el-input>
        </el-form-item>
        <el-form-item class="code-item" prop="code">
          <!-- 登录验证码 -->
          <el-input
            class="code"
            placeholder="验证码"
            v-model="loginFrom.code"
          ></el-input>
          <el-button plain class="codebtn">点击获取验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="loginFrom.check">我同意此坑人条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitLogin" type="primary" style="width:100%">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginFrom: {
        mobile: '',
        code: '',
        check: false
      },
      loginRoles: {
        //   规则
        // required: true,必填
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' },
          {}
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请正确的输入验证码' }
        ],
        //   自定义函数
        check: [
          {
            validator: function (rules, value, callback) {
              // 规则，校验的值，回调函数
              if (value) {
                callback()
              } else {
                callback(new Error('必须勾选协议'))
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.myFrom.validate(isOK => {
        if (isOK) {
          // 这里会掉接口去服务器查询数据
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.loginFrom
          }).then((res) => {
            // 成功回调
            window.localStorage.setItem('user-token', res.data.data.token)
            this.$router.push('/home')
          }).catch(erro => {
            // 失败回调
            this.$message('手机号或验证码错误')
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scope>
.homebgc {
  background: url("../../assets/img/login_bg.jpg");
  height: 100vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .card {
    width: 450px;
    height: 380px;
    // text-align: center;
    img {
      height: 55px;
    }
    .phone {
      margin-top: 50px;
    }
    .code-item {
      // text-align: left;
      .code {
        width: 65%;
        margin-top: 15px;
      }
      .codebtn {
        margin-top: 15px;
        float: right;
      }
    }
  }
}
</style>
