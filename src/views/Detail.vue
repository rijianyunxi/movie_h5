<template>
  <div class="detail">
    <Back :title="title"></Back>
    <div style="height: 8.4rem"></div>
<!--    <video controls ref="video" id="video" class="veideo_box"></video>-->
    <Player :videoUrl="videoUrl" video-id="hlsPlayer"></Player>
    <div class="_title">{{ title }}</div>
    <Title @showMore="showMore" :title="plate"></Title>
    <Movie @play="palyCurrent" replace ref="movie" @refresh="refresh" @load="loadMore" scroll :list="list"></Movie>
  </div>
</template>

<script>
import Back from "@/components/Back.vue";
import Title from "@/components/Title.vue";
import Movie from "@/components/Movie.vue";
import Player from "@/components/Player.vue";

export default {
  name: "detail",
  components: {
    Back,
    Movie,
    Title,
    Player
  },
  created() {
    let { videoName,plate,videoUrl } = this.$route.query;
    this.plate = plate;
    this.title = videoName || "";
    this.videoUrl = videoUrl;
    // this.videoUrl = "https://new.qqaku.com/20220721/I3Qto3BT/index.m3u8"
    this.getList()
  },
  data() {
    return {
      videoUrl:"",
      hls:null,
      title: "",
      plate:"",
      list: [],
      page:0,
    };
  },
  methods: {
    palyCurrent(item){
      let {videoName,videoUrl} = item;
      this.title = videoName;
      this.videoUrl = videoUrl
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
    init() {
      const video = this.$refs.video;
      var videoSrc = "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8";
      if (Hls.isSupported()) {
        this.hls = new Hls();
        this.hls.loadSource(videoSrc);
        this.hls.attachMedia(video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, function () {
          video.play();
          console.log("start play");
        });
        
        // this.hls.on(Hls.Events.ERROR, function (err) {
        //     Notify({ type: 'danger', message: '视频播放失败，请重试' });
        // });
      }
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