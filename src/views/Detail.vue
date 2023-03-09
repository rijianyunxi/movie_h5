<template>
  <div class="detail">
    <Back :title="title"></Back>
    <div style="height: 8.4rem"></div>
<!--    <Player :videoUrl="videoUrl" video-id="hlsPlayer"></Player>-->
    <VideoJs :url="videoUrl" :poster="coverUrl"></VideoJs>
    <div class="_title">{{ title }}</div>
    <Title @showMore="showMore" :title="plate"></Title>
    <Movie @play="palyCurrent" :replace="true" ref="movie" @refresh="refresh" @load="loadMore" scroll :list="list"></Movie>
  </div>
</template>

<script>
import Back from "@/components/Back.vue";
import Title from "@/components/Title.vue";
import Movie from "@/components/Movie.vue";
// import Player from "@/components/Player.vue";
import VideoJs from "@/components/VideoJs";

export default {
  name: "detail",
  components: {
    Back,
    Movie,
    Title,
    // Player,
    VideoJs
  },
  created() {
    let { videoName,plate,videoUrl, coverUrl } = this.$route.query;
    this.plate = plate;
    this.title = videoName || "";
    this.coverUrl = coverUrl;
    this.setTitle();
    this.videoUrl = videoUrl;
    this.getList()
  },
  beforeDestroy() {
    this.setTitle()
  },
  data() {
    return {
      videoUrl:"",
      coverUrl:"",
      title: "",
      plate:"",
      list: [],
      page:0,
    };
  },
  methods: {
    setTitle(){
      document.title = this.title
    },
    palyCurrent(item){
      // let {videoName,videoUrl,coverUrl} = item;
      // this.title = videoName;
      // this.setTitle();
      // this.videoUrl = videoUrl;
      // this.coverUrl = coverUrl;


      this.$router.replace({
        path:"/tmp",
        query:item
      });
      // window.location.reload()
    },
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
    showMore() {
      this.$router.push({
        path: "/more",
        query: {
          plate:this.plate
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
  background: var(--bg);
  .veideo_box {
    width: 100%;
  }
  ._title{
    width: 100%;
    line-height: 4rem;
    padding: 2rem;
    color:var(--cl);
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  ::v-deep .title{
    width: 95%;
    margin-left: 2.5%;
  }
}
</style>