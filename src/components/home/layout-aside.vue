<template>
<div class="layout-aside">
    <div class="title">
    <img :src="collsapse?smallImg:bigImg" alt="">
    </div>
<el-menu :collapse="collsapse" :style="{width:collsapse?'60px':'230px'}" router background-color="#353b4e" style="width:231px; overflow: hidden;" text-color="#abafb5" active-text-color="#ffd04b;width:231px ">
    <el-menu-item index="/home">
       <i class="el-icon-s-home"></i> <span>首页</span>
    </el-menu-item>
    <el-submenu index="2">
        <!-- //先这样放着 -->
        <template slot="title">

            <i class="el-icon-s-order"></i>
           <span> 内容管理</span>
        </template>
        <el-menu-item index="/home/publish">发布文章</el-menu-item>
        <el-menu-item index="/home/articles">内容列表</el-menu-item>
        <el-menu-item index="/home/comment">评论列表</el-menu-item>
        <el-menu-item index="/home/material">素材管理</el-menu-item>
    </el-submenu>
    <el-submenu index="1">
        <!-- //先这样放着 -->
        <template slot="title">
            <i class="el-icon-s-flag"></i>
        <span>粉丝管理</span>

        </template>
        <el-menu-item>图文数据</el-menu-item>
        <el-menu-item>粉丝概况</el-menu-item>
        <el-menu-item>粉丝画像</el-menu-item>
        <el-menu-item>粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item index="/home/account">
        <i class="el-icon-s-custom"></i> <span>账户信息</span>
    </el-menu-item>
</el-menu>
</div>
</template>

<script>
export default {
  props: ['collsapse'],
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style scoped lang="less">
    .layout-aside{
        overflow: hidden;
        // width: 230px;
        .el-menu{
            border-right: 0;
        }
        .title{
            text-align: center;
            padding: 20px 0;
            background-color : #2e2f32;

        }
    }
</style>
