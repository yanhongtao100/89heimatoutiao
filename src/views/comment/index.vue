<template>
  <el-card>
    <bread-crumb slot="header">
    <template slot="title">评论</template>
    </bread-crumb>
    <!-- body内容 -->
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="600"></el-table-column>
      <!-- 格式化属性 -->
      <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="obj">

        <el-button type="text" size="small">修改</el-button>
        <el-button type="text" size="small">{{ obj.row.comment_status?"关闭":"打开"}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(
        result => {
          this.list = result.data.results
        }
      )
    },
    formatterBool (row, column, cellValue, index) {
      // 布尔值转换方法
      return cellValue ? '正常' : '关闭'
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>

</style>
