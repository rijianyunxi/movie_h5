<template>
  <div class="title">
    <span>{{ title }}</span>
    <div class="more" @click="$emit('showMore')"></div>
  </div>
</template>

<script>
export default {
  name:"Title",
  props:{
    title:{
      type:String,
      default:""
    }
  }
}
</script>

<style lang="less" scoped>
  .title{
    background: url("@/assets/images/class.png") no-repeat;
    background-size: 100% 100%;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    span{
      display: inline-block;
      color: var(--cl);
      font-weight: 600;
      font-size: 2.8rem;
      height: 5rem;
      line-height: 5rem;
      text-align: center;
      padding-left: .5rem;
    }
    .more{
      height: 3.5rem;
      width: 13rem;
      background: url("@/assets/images/more.png") no-repeat;
      background-size: 100% 100%;
    }
  }

</style>