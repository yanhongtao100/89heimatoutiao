<template>
  <div class="cover-image">
   <div @click="openDialog(index)" class="cover-item" v-for="(item,index) in list " :key="index">
     <img :src="item? item:defaultImage " alt="">
   </div>
   <el-dialog :visible="dialogVisible" @close="closeDialog">
     <select-image @selectOneImg="receiveImg">

     </select-image>
   </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false, // 控制弹层打开或关闭的变量
      defaultImage: require('../../assets/img/pic_bg.png'),
      selectIndex: -1
    }
  },
  methods: {
    openDialog (index) {
      this.dialogVisible = true
      this.selectIndex = index
    },
    closeDialog () {
      this.dialogVisible = false
    },
    receiveImg (img) {
      this.$emit('clickOneImg', img, this.selectIndex)
      this.closeDialog()
    }
  }
}
</script>

<style lang='less' secoped>
.cover-image{
  display: flex;
  margin-left: 100px;
  margin-top: 20px;
  .cover-item{
    border: 1px solid #ccc;
    width: 250px;
    height: 250px;
    padding: 10px;
    img{
      width: 100%;
      height: 100%;

    }
  }
}
</style>
