<template>
  <div class="more">
        <Back :title="plate"></Back>
        <Movie ref="movie" @refresh="refresh" @load="loadMore" scroll :list="list"></Movie>
  </div>
</template>

<script>
import Back from "@/components/Back.vue"
import Movie from "@/components/Movie.vue"
import {videoInPlateList} from "@/api";

export default {
    name:"More",
    components:{
        Back,Movie
    },
    created(){
        let plate = this.$route.query.plate;
        this.plate = plate;
        this.getList()
    },
    data(){
        return{
          plate:"",
            list:[],
            page:0,
        }
    },
  methods:{
      getList(cb){
        this.API.videoInPlateList(this.plate,this.page).then(res=>{
          this.list = [...this.list,...res.data.content];
          if(res.data.content.length < 20){
            this.$nextTick(()=>{
              this.$refs.movie.finished = true;
            })
          }
          cb&&cb()
        })
      },
    loadMore(){
        this.page++;
        this.getList(()=>{
          this.$nextTick(()=>{
            this.$refs.movie.loading = false;
          })
        })
    },
    refresh(){
      this.page = 0;
      this.list = [];
      this.getList(()=>{
        this.$nextTick(()=>{
          this.$refs.movie.refreshing = false;
        })
      })
    },
    mock(){
      this.list = [
        {
          name: "111",
          pic: "https://img01.yzcdn.cn/vant/apple-8.jpg",
          duration: "77876",
        },
        { name: "222", pic: "https://img01.yzcdn.cn/vant/apple-7.jpg" },
        { name: "33", pic: "https://img01.yzcdn.cn/vant/apple-1.jpg" },
        { name: "44", pic: "https://img01.yzcdn.cn/vant/apple-2.jpg" },

      ]
    },
  }
}
</script>

<style scoped lang="less">
    .more{
      box-sizing: border-box;
        height: 100vh;
        width: 100%;
        background: var(--bg);
        overflow-x: hidden;
        overflow-y: auto;
        padding-top: 8rem;
    }
</style>