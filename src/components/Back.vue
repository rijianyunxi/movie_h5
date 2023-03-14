<template>
  <div class="title">
    <img @click="$router.go(-1)" src="~@/assets/images/back.png" alt="">
    <div class="content">{{ title }}</div>
  </div>
</template>
  
<script>
export default {
  name: "Title",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
};
</script>
  <style lang="less" scoped>
.title {
    width: 100%;
    background: var(--bg);
    z-index: 9;
    height: 8rem;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    left: 0;
    .content{
      color: var(--cl);
      font-weight: 600;
      font-size: 3.2rem;
      line-height: 8rem;
      text-align: center;
      width: 75%;
      height: 8rem;
      margin: 0 auto;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  img{
    position: absolute;
    left: 2rem;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    height: 4rem;
    width: 2rem;
  }
  //::v-deep .van-icon-arrow-left {
  //  font-size: 3.5rem;
  //
  //  padding: 2rem;
  //}
}
</style>