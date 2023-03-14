<template>
  <div>
    <div class="movie" v-if="list.length > 0 && !scroll">
      <div @click="dealClick(item)" class="movie_item" v-for="(item, index) in list" :key="index">
        <div class="img_box">
          <img :src="item.coverUrl" alt="" />
          <span>{{ item.duration | duration }}</span>
        </div>
        <div class="title">{{ item.videoName }}</div>
      </div>
    </div>
    <van-pull-refresh v-if="list.length > 0 && scroll" v-model="refreshing" @refresh="onRefresh">
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >

        <div class="movie">
          <div  @click="dealClick(item)" class="movie_item" v-for="(item, index) in list" :key="index">
            <div class="img_box">
              <img :src="item.coverUrl" alt="" v-lazy="item.coverUrl" />
              <span>{{ item.duration | duration }}</span>
            </div>
            <div class="title">{{ item.videoName }}</div>
          </div>
        </div>

      </van-list>
    </van-pull-refresh>
    <van-empty v-if="list.length === 0 && firstLoad" image="search" description="正在获取数据..." />
    <van-empty v-if="list.length === 0 && !firstLoad" image="search" description="无数据" />
  </div>
</template>

<script>
import { formatSeconds } from "@/util/util"
export default {
  name: "Movie",
  props: {
    list: {
      type: Array,
      default: [],
    },
    scroll:{
      type:Boolean,
      default: ()=>false
    },
    replace:{
      type:Boolean,
      default: ()=>false
    },
    firstLoad:{
      type:Boolean,
      default: ()=>true
    }
  },
  data(){
    return{
      loading: false,
      finished: false,
      refreshing: false,
    }
  },
  filters:{
    duration(value){
      if(!value) return "00:00:00";
      return formatSeconds(value)
    }
  },
  methods:{
    onLoad(){
      this.$emit('load')
    },
    onRefresh(){
      this.finished = false;
      this.loading = true;
      this.$emit('refresh')
    },
    dealClick(item){
      if(this.replace){
       this.$emit("play",item)
      }else{
        this.$router.push({
          path:"/detail",
          query:item
        },)
      }
    }
  }
};
</script>

<style lang="less" scoped>
@media screen and (max-width:600px){
  .movie{
    grid-template-columns: 1fr 1fr;
  }
}
@media screen and (min-width:600px) and (max-width:960px){
  .movie{
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media screen and (min-width:960px){
  .movie{
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  }
}
.movie {
  background: var(--bg);
  width: 100%;
  box-sizing: border-box;
  padding: 1rem;
  display: grid;
  //grid-template-columns: 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  .movie_item {
    overflow: hidden;
    .img_box {
      position: relative;
      border-radius: 2rem;
      overflow: hidden;
      img {
        //height: 21rem;
        //width: 33rem;
        width: 100%;
        height:  23rem;
      }
      span {
        display: inline-block;
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        background: rgba(0, 0, 0, 0.7);
        color: var(--cl);
        font-size: 2rem;
        padding: 0.5rem;
        border-radius: 1rem;
      }
    }
    .title {
      margin: .55rem 0 0 0.2rem;
      background: var(--bg);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--cl);
      font-size: 2.8rem;
    }
  }
}


</style>