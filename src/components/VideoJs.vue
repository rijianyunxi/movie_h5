<template>
  <div class="VideoJs">
    <video
        style="position: absolute;top: 0;left: 0;height: 100%;width:100%"
        id="video_box"
        class="vjs-cskin video-js  vjs-default-skin vjs-big-play-centered"
        controls
        preload="auto"
        width="100%"
        height="100%"
        :autoplay="true"
        :poster="poster"
    >
      <source :src="url"  type="application/x-mpegURL">
    </video>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import videojs from "video.js"
export default {
  name: "VideoJs",
  props:{
    url:{
      type:String,
      default:()=>''
    },
    poster:{
      type:String,
      default:()=>''
    },
  },
  watch:{
    url:{
      immediate:true,
      handler(v){
        if(!v) return false;
        console.log("===========================>",v)
        if(this.player){
          this.player.src = this.url;
          this.player.play()
          return false;
        }
        this.$nextTick(()=>{
          this.init()
        })
      }
    },
  },
  beforeDestroy() {
    this.unInit()
  },
  data() {
    return {
      player:null
    };
  },
  methods: {
    randomString(len) {
      len = len || 32;
      const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      const maxPos = $chars.length;
      let pwd = '';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
      return pwd;
      },
    unInit(){
      if (this.player !== null) {
        this.player.dispose();
        this.player = null;
      }
    },
    init() {
      this.player = videojs('video_box',{
            bigPlayButton: true,
            posterImage: true,
            errorDisplay: true,
            controlBar: {
              fullscreenToggle: true,
              volumePanel: {
                inline: false,
              },
            },
            muted: false,
          } ,
          () => {
            this.player.on("play", () => {
              console.log("开始播放")
            })
        })
      },
    },
};
</script>

<style lang="less" scoped>
.VideoJs {
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
}
</style>