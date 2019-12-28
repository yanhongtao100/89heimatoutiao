<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">账户信息</template>
    </bread-crumb>
    <el-row>
      <el-col :span="12">
        <el-form
          style="margin-left:100px"
          label-width="100px"
          :model="formData"
          :rules="rules"
          ref="myForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input style="width:50%" v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="简  介" prop="intro">
            <el-input style="width:50%" v-model="formData.intro"></el-input>
          </el-form-item>
          <el-form-item label="邮 箱" prop="email">
            <el-input style="width:50%" v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input
              style="width:50%"
              disabled
              v-model="formData.mobile"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveUserInfo">
              提交信息
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12">
        <el-upload class="head-upload" action="" :show-file-list="false" :http-request="uploadImg">
          <img :src="formData.photo ? formData.photo : defaultImg" alt="" />
        </el-upload>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      formData: {
        name: '', // 用户名
        intro: '', // 简介
        photo: '', // 头像
        email: '', // 邮箱
        mobile: ''
      },
      rules: {
        name: [
          { required: true, message: '用户名不能为空' },
          { max: 7, min: 1, message: '用户名长度限制在1-7' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          {
            pattern:
              /^[A-Za-z0-9]+([_.][A-Za-z0-9]+)*@([A-Za-z0-9-]+\.)+[A-Za-z]{2,6}$/,
            message: '邮箱格式不正确'
          }
        ]
      },
      defaultImg: require('../../assets/img/404.png')
    }
  },
  methods: {
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.formData = result.data
      })
    },
    saveUserInfo () {
      this.$refs.myForm.validate((isOk) => {
        this.$axios({
          url: '/user/profile',
          method: 'patch',
          data: this.formData
        }).then(() => {
          this.$message({
            type: 'success',
            message: '提交成功'
          })
          eventBus.$emit('updateUserInfoSuccess')
        })
      })
    },
    uploadImg (params) {
      let data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        data,
        method: 'patch'
      }).then((result) => {
        this.formData.photo = result.data.photo
        eventBus.$emit('updateUserInfoSuccess')
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.head-upload {
  width: 180px;
  height: 180px;
  margin-top: 30px;

  img {
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }
}
</style>
