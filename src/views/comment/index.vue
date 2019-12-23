<template>
  <el-card v-loading="loading">
    <bread-crumb slot="header">
      <template slot="title">评论</template>
    </bread-crumb>
    <!-- body内容 -->
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <!-- 格式化属性 -->
      <el-table-column
        :formatter="formatterBool"
        prop="comment_status"
        label="评论状态"
      ></el-table-column>
      <el-table-column
        prop="total_comment_count"
        label="总评论数"
      ></el-table-column>
      <el-table-column
        prop="fans_comment_count"
        label="粉丝评论数"
      ></el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="obj">
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small" @click="openOrClose(obj.row)">{{
            obj.row.comment_status ? "关闭" : "打开"
          }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" align="middle" style="height:80px">
      <el-pagination
        background
        layoout="prev,page,next"
        :total="page.totle"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        totle: 0, // 放置分页数据
        pageSize: 10,
        currentPage: 1
      },
      loading: ''
    }
  },
  methods: {
    changePage (newPage) {
      this.page.currentPage = newPage// 修改当前页码
      this.getComment()// 调用请求方法
    },
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.totle = result.data.total_count
        window.setTimeout(() => {
          this.loading = false
        }, 2000)
      })
    },
    formatterBool (row, column, cellValue, index) {
      // 布尔值转换方法
      return cellValue ? '正常' : '关闭'
    },
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`你确定要${mess}吗？`).then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          params: {
            article_id: row.id.toString()
          },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          this.$message({
            type: 'success',
            message: '操作成功'
          })
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()

    this.loading = true
  }
}
</script>

<style></style>
