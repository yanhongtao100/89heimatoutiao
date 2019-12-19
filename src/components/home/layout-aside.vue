<template>
<div class="layout-aside">
    <div class="title">
    <img src="../../assets/img/logo_admin.png" alt="">
    </div>
<el-menu background-color="#353b4e" style="width:231px; overflow: hidden;" text-color="#abafb5" active-text-color="#ffd04b;width:231px ">
    <el-menu-item>
        首页
    </el-menu-item>
    <el-submenu index="2">
        <!-- //先这样放着 -->
        <span slot="title">内容管理</span>
        <el-menu-item>发布文章</el-menu-item>
        <el-menu-item>内容列表</el-menu-item>
        <el-menu-item>评论列表</el-menu-item>
        <el-menu-item>素材管理</el-menu-item>
    </el-submenu>
    <el-submenu index="1">
        <!-- //先这样放着 -->
        <span slot="title">粉丝管理</span>
        <el-menu-item>图文数据</el-menu-item>
        <el-menu-item>粉丝概况</el-menu-item>
        <el-menu-item>粉丝画像</el-menu-item>
        <el-menu-item>粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item>
        账户信息
    </el-menu-item>
</el-menu>
</div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
    .layout-aside{
        width: 230px;
        .title{
            text-align: center;
            padding: 20px 0;
            background-color : #2e2f32;

        }
    }
</style>
