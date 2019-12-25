<template>
<div>
  <el-card class="articles">
    <bread-crumb slot="header">
      <template slot="title">
        内容列表
      </template>
    </bread-crumb>
    <el-row class="searchToll">
      <el-col :span="3">
        <span>文章状态</span>
      </el-col>
      <el-col :span="18">
        <el-radio-group v-model="formDate.status" @change="changeCondition">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
    <el-row class="searchToll">
      <el-col :span="3">
        <span>频道列表</span>
      </el-col>
      <el-col :span="17">
        <el-select v-model="formDate.channel_id" @change="changeCondition">
          <el-option
            v-for="item in channels"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="searchToll">
      <el-col :span="3">
        <span>时间选择</span>
      </el-col>
      <el-col :span="18">
        <el-date-picker
        @change="changeCondition"
        value-format="yyyy-MM-dd"
          v-model="formDate.dateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-col>
    </el-row>
  </el-card>
<div class="height"></div>
  <el-card>
    <span  slot="header">共找到{{page.totle}}条符合条件的内容</span>
    <el-row v-for="item in list" :key="item.id.toString()" type="flex" justify="space-between" class="article-item">
<el-col :span="14">
    <el-row type="flex" >
<img :src="item.cover.images.length ?item.cover.images[0]:defaultImg " alt="">
<div class="info">
    <span style=" white-space: nowrap; text-overflow: ellipsis;">{{item.title}}</span>
    <el-tag class="tag" :type="item.status |filterType">{{item.status |filterStatus }}</el-tag>
    <span class="date">{{item.pubdate}}</span>
</div>
    </el-row>

</el-col>
<el-col :span="6">
    <el-row type="flex" class="right" justify="end">
    <span @click="toModify(item.id)"> <i class="el-icon-edit" ></i> 修改</span>
    <span  @click="delArticles(item.id)"> <i class="el-icon-delete"></i> 删除</span>
    </el-row >
    </el-col>
    </el-row>
    <el-row type="flex" justify="center" align="middle">
<el-pagination
  background
  layout="prev, pager, next"
  :total="page.totle"
  :current-page="page.currentPage"
  :page-size="page.pageSize"
 @current-change="changePage"
  style="height:80px">
</el-pagination>
    </el-row>
  </el-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      formDate: {
        status: 5,
        channel_id: null,
        dateRange: ''
      },
      page: {
        totle: 0, // 放置分页数据
        pageSize: 10,
        currentPage: 1
      },
      channels: [],
      list: [], // 接受文章列表数据
      defaultImg: require('../../assets/img/404.png')
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
        default:
          break
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
        default:
          break
      }
    }
  },

  methods: {
    toModify (id) {
      this.$router.push(`/home/publish/${id.toString()}`)
    },
    delArticles (id) {
      // 删除文章
      this.$confirm('确定？').then(result => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id.toString()}`
        }).then(res => {
          this.$message({ message: '删除成功', type: 'success' })
          this.getConditionArticle()
        })
      })
    },
    changePage (newPage) {
      this.page.currentPage = newPage// 修改当前页码
      this.getConditionArticle()
    },
    gteChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    getArticles (params) { // 调用axios
      this.$axios({
        url: '/articles',
        params
      }).then((result) => {
        this.list = result.data.results
        this.list = result.data.results
        this.page.totle = result.data.total_count
      }).catch(rej => {
        // this.list = rej.data.results
        console.log(rej)
      })
    },
    changeCondition () { // 改变变量
      this.page.currentPage = 1// 改变分页
      this.getConditionArticle()
    },
    getConditionArticle () { // 设置数据
      let params = {
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        status: this.formDate.status === 5 ? null : this.formDate.status,
        channel_id: this.formDate.channel_id,
        begin_pubdate: this.formDate.dateRange.length ? this.formDate.dateRange[0] : null,
        end_pubdate: this.formDate.dateRange.length > 1 ? this.formDate.dateRange[1] : null

      }
      this.getArticles(params)
    }
  },
  created () {
    this.gteChannels()
    this.getArticles({ page: 1, per_page: 10 })
  }
}
</script>

<style lang="less" scoped>
.articles {

  .searchToll {
    height: 60px;
    padding-left: 50px;
  }
}
.height{
    height: 20px;
}
.article-item{
        margin:20px 0;
        padding: 0 0 10px 0 ;
        border-bottom: 1px solid #f2f3f5;
    img{

        height: 100px;
        width: 180px;
        margin-right: 10px;
    }
    .info {
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .tag{
            max-width: 60px;
        }
        .data{
            color: #999;
            font-size: 12;
        }
    }
    .right{
        span{
            margin-left: 8px;
            font-size: 14px;
            cursor: pointer;
        }
    }
}
</style>
