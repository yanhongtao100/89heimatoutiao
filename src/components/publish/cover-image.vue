<template>
  <div class="cover-image">
   <div class="cover-item" v-for="(item,index) in list " :key="index">
     <img src="../../assets/img/pic_bg.png" alt="">
   </div>
  </div>
</template>

<script>
export default {
  props: ['list']
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

    }
  }
}
</style>
