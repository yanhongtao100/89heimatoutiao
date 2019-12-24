<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">
        素材管理
      </template>
    </bread-crumb>
    <el-row type="flex" justify="end">
      <el-upload :http-request="uploadImg" action>
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="全部素材" name="all">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt="" />
            <el-row type="flex" justify="space-around" class="operate">
              <i class="el-icon-star-on" @click="collectOrCancel(item)" :style="{color:item.is_collected?'red':''}"></i>
              <i class="el-icon-delete-solid" @click="delMaterial(item.id)"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination background="" layout="prev,pager,next" :total="page.total"
          :current-page="page.currentPage" :page-size="page.pageSize" @current-change="changePage">
          </el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏" name="collect">
        <div class="img-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt="" />
            <el-row type="flex" justify="space-around" class="operate">
            </el-row>
          </el-card>
        </div>
          <el-row type="flex" justify="center" style="height:80px" align="middle">
          <el-pagination background="" layout="prev,pager,next" :total="page.total"
          :current-page="page.currentPage" :page-size="page.pageSize" @current-change="changePage">
          </el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      activeName: 'all',
      list: [],
      page: {
        total: 0, // 放置分页数据
        pageSize: 12, // 每页多少
        currentPage: 1// 当前页数
      }
    }
  },
  methods: {
    // 删除图片接口
    delMaterial (id) {
      this.$confirm('确定？').then(() => {

      })
    },
    // 调用收藏或取消收藏接口
    collectOrCancel (params) {
      this.$axios({
        url: `/user/images/${params.id}`,
        method: 'put',
        data: {
          collect: !params.is_collected
        }
      }).then(() => {
        this.getAllMeteriar()
      })
    },
    uploadImg (params) {
      this.loading = true
      let from = new FormData()
      from.append('image', params.file)
      this.$axios({
        method: 'post',
        url: '/user/images',
        data: from
      }).then(result => {
        this.getAllMeteriar()
        this.loading = false
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllMeteriar()
    },
    changeTab () {
      this.page.currentPage = 1
      this.getAllMeteriar()
    },
    getAllMeteriar () {
      this.$axios({
        url: '/user/images',
        params: { collect: this.activeName === 'collect', page: this.page.currentPage, per_page: this.page.pageSize }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getAllMeteriar()
  }
}
</script>
<style lang="less" scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-card {
    width: 200px;
    height: 180px;
    font-size: 20px;
    border-radius: 15px 15px 0 0;
    position: relative;
    margin: 10px 10px;
    img {
      width: 100%;
      background-position: cover;
    }
    .operate {
      width: 100%;
      height: 30px;
      position: absolute;
      background-color: #f4f5f6;
      bottom: 0;
      left: 0;
      i{
        line-height: 30px;
        cursor: pointer;
      }
    }
  }
}
</style>
