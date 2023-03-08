<template>
  <div class="video-play" :class="{ 'video-bg-wrap': !videoId }">
<!--    <video controls :id="videoId" autoplay="true" playsinline="true" webkit-playsinline="true" x5-playsinline="true" tabindex="2" mediatype="video" ></video>-->

    <div v-show="showLoading" class="load"> 拼命加载中...</div>
    <video controls v-show="!error && !showLoading" :id="videoId" autoplay="true" playsinline="true" webkit-playsinline="true" x5-playsinline="true" tabindex="2" mediatype="video" ></video>
    <div @click="rePlay" v-show="error" class="error">资源加载失败,<span>点击重新加载</span></div>
  </div>
</template>
<script>
import Hls from "hls.js";
export default {
  props: {
    videoId: {
      type: String,
      required: true,
      default: () => "",
    },
    videoUrl: {
      type: String,
      default: () => "",
    }
  },
  data() {
    return {
      hls: null,
      error: false,
      showLoading:true
    };
  },
  watch: {
    videoUrl: {
      handler(val) {
        if(this.hls){
          this.hls.stopLoad();
          this.showLoading = true;
        }
        this.$nextTick(()=>{
          this.playVideo(this.videoId, val);
        })
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    rePlay(){
      this.playVideo(this.videoId, this.videoUrl);
    },
    playVideo(id, url) {
      if (id && url) {
        this.showLoading = true;
        this.error = false;
        let video = document.getElementById(id);
        this.hls = new Hls();
        this.hls.attachMedia(video);
        this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          this.hls.loadSource(url);
        });
        this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
          this.showLoading = false;
        });
        this.hls.on(Hls.Events.ERROR, (event, data) => {

          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                console.log('fatal network error encountered, try to recover');
                this.hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('fatal media error encountered, try to recover');
                this.hls.recoverMediaError();
                break;
              default:
                this.showLoading = false;
                this.error = true;
                this.hls.stopLoad();
                break;
            }
          }
        });
      }
    },
    destroyVideo(cb){
      if (this.hls) {
        this.hls.detachMedia();
        this.hls.destroy();
      }
      this.hls = null;
      cb&&cb();
    },
  },
  beforeDestroy() {
   this.destroyVideo()
  },
};
</script>
<style lang="less" scoped>
.video-play {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  min-height:40rem;
  position: relative;
  img{
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .error, .load{
    box-sizing: border-box;

    width: 100%;
    min-height: 40rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: var(--cl);
    border: 1px solid #847cb2;
    background: url("~@/assets/images/load.png") no-repeat;
    background-size: 100% 100%;
  }
  .error span{
    color: limegreen;
  }
  video {
    object-fit: fill;
    height: 100%;
    width: 100%;
    min-height:40rem;
  }
}
</style>