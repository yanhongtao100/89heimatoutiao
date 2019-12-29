<template>

<el-container>

  <el-aside :style="{width:collsapse ? '60px':'230px'}" style="transition:all 0.3s;min-height:100vh;background:#353b4e">
    <layout-aside :collsapse="collsapse">
    </layout-aside>
  </el-aside>
  <el-container>
    <el-header>
      <layout-header></layout-header>
      </el-header>
    <el-main style="padding:0">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import evenbus from '../../utils/eventBus'
export default {
  data () {
    return {
      collsapse: false
    }
  },
  created () {
    evenbus.$on('changeCollapse', () => {
      this.collsapse = !this.collsapse
    })
  }
}
</script>

<style>

</style>
