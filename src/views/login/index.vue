<template>
  <div class="homebgc">
    <el-card class="card">
        <div style="text-align:center">
      <img src="../../assets/img/logo_index.png" alt="" />
      </div>
      <el-form>
          <el-form-item>
              <!-- 登录手机号 -->
              <el-input class="phone" placeholder="手机号"></el-input>
          </el-form-item>
          <el-form-item class="code-item">
              <!-- 登录验证码 -->
              <el-input class="code" placeholder="验证码"></el-input>
              <el-button plain class="codebtn">点击获取验证码</el-button>
          </el-form-item>
          <el-form-item>
              <el-checkbox>我同意此坑人条款</el-checkbox>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" style="width:100%" >注册</el-button>
          </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {}
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
    .phone{
        margin-top: 50px;
    }
    .code-item{
        // text-align: left;
        .code{
            width: 65%;
            margin-top: 15px
        }
        .codebtn{
            margin-top:15px;
            float: right;
        }
    }
  }
}
</style>
