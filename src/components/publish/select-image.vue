<template>
  <el-tabs v-model="activeName" >
    <el-tab-pane label="素材库" name="material">
      <div class="select-img-list">
        <el-card class="img-card" v-for="item in list" :key="item.id">
          <img :src="item.url" alt=""  @click="clickImg(item.url)"/>
        </el-card>
      </div>
      <el-row type="flex" justify="center">
        <el-pagination
          background=""
          layout="prev, pager,next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePagge"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="upload">上传图片</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 默认选择素材库
      list: [],
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0

      }
    }
  },
  methods: {
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    changePagge (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    clickImg (url) {
      this.$emit('selectOneImg', url)
    }
  },
  created () {
    this.getAllImg()
  }
}
</script>

<style lang="less" scoped>
.select-img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    width: 120px;
    height: 120px;
    margin: 10px 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
