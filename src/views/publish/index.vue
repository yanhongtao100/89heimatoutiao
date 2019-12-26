<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">
        发表文章
      </template>
    </bread-crumb>
    <el-form ref="publishForm" style="margin-left:50px" label-width="100px" :model="formData" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input style="width:60%" v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor style="height:300px" type="textarea" :rows="4" v-model="formData.content"></quill-editor>
      </el-form-item>
      <el-form-item label="封面" style="margin-top:100px" prop="type">
        <el-radio-group v-model="formData.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道" prop="channel_id">
        <el-select v-model="formData.channel_id">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="publishArticle(false)">发布</el-button>
        <el-button @click="publishArticle(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [], // 接收频道数组
      formData: {// 接收表单验证对象
        title: '', // 标题
        content: '', // 内容
        cover: {// 图片
          type: 0, // 图片类型，-1,0，1-1,3-3，分别代表自动，无图，1-1张，3-3张
          images: [ ]// 存储的图片地址
        },
        channel_id: ''// 频道id
      },
      rules: {// 校验规则
        title: [{ required: true, message: '标题不能为空' },
          { min: 5, max: 30, message: '标题长度需要在5-30之间' }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道不能为空' }]
      }
    }
  },
  methods: {
    // 获取频道
    gteChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    publishArticle (draft) {
      // 发布文章
      this.$refs.publishForm.validate((isOk) => {
        if (isOk) {
          let { articleId } = this.$route.params
          this.$axios({
            method: articleId ? 'put' : 'post',
            url: articleId ? `/articles/${articleId}` : '/articles',
            params: { draft },
            data: this.formData
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getArticleById (articleId) {
      console.log(articleId)

      this.$axios({
        url: `/articles/${articleId}`
      }).then((result) => {
        this.formData = result.data
      })
    }
  },
  watch: {
    $route: function (to, from) {
      if (Object.keys(to.params).length) {
        this.getArticleById(to.params.articleId)
      } else {
        this.formData = {// 接收表单验证对象
          title: '', // 标题
          content: '', // 内容
          cover: {// 图片
            type: 0, // 图片类型，-1,0，1-1,3-3，分别代表自动，无图，1-1张，3-3张
            images: [ ]// 存储的图片地址
          }
        }
      }
    },
    'formData.cover.type': function () {
      if (this.formData.cover.type === 0 || this.formData.cover.type === -1) {
        // 无图，自动
        this.formData.cover.images = []
      } else if (this.formData.cover.type === 1) { // 单图模式
        this.formData.cover.images = ['']
      } else if (this.formData.cover.type === 3) { // 三图模式
        this.formData.cover.images = ['', '', '']
      }
    }

  },
  created () {
    this.gteChannels()
    let { articleId } = this.$route.params
    if (articleId) {
      this.getArticleById(articleId)
    }
  }
}
</script>

<style></style>
