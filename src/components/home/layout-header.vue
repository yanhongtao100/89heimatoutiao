<template>
    <el-row type="flex" justify="space-between" class="layout-header" align="middle">
        <el-col :span="6" class="left">
            <i class="el-icon-s-fold"></i>
            <span class="title">江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="4" class="right">
            <el-row type="flex" justify="end" align="middle">
                <img src="../../assets/img/avatar.jpg" alt="">
                <el-dropdown>
                    <span>456456</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人信息</el-dropdown-item>
                        <el-dropdown-item>Git地址</el-dropdown-item>
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout-header{
    height: 60px;
    .left{
        font-size:18px;
        font-weight: 500;
        .title{
            color:#2c3e50;
            margin-left: 5px;
            font-size: 16px;
        }
    }
    .right{
        img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 5px
        }
    }
}
</style>
