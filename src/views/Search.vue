<template>
  <div class="search">
    <div class="form">
      <form action="/" class="">
        <van-search
          shape="round"
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
          background="var(--bg)"
        />
      </form>
    </div>
    <div style="height:9rem"></div>
    <div v-if="value.length === 0" class="top10">
        <li @click="dealClick(item)" v-for="(item,index) in top10List" :key="index">
          <span :class="{hot: index <= 2}">{{index + 1}}.</span>
          <p>{{item}}</p>
        </li>
    </div>
    <Movie v-if="value.length > 0 || top10List === 0 " ref="movie" @refresh="refresh" @load="loadMore" scroll :list="list"></Movie>
  </div>
</template>

<script>
import Movie from "@/components/Movie.vue";
export default {
  name: "Search",
  components: { Movie },
  created() {
    this.getTop10()
  },
  watch:{
    value(v){
      if(v){
        this.onSearch()
      }
    }
  },
  data() {
    return {
      page:0,
      value: "",
      list: [],
      top10List:[ ]
    };
  },
  methods: {
    loadMore(){
      this.page++;
      this.onSearch(()=>{
        this.$nextTick(()=>{
          this.$refs.movie.loading = false;
        })
      })
    },
    refresh(){
      this.page = 0;
      this.list = [];
      this.onSearch(()=>{
        this.$nextTick(()=>{
          this.$refs.movie.refreshing = false;
        })
      })
    },
    dealClick(item){
      this.value = item;
    },
    getTop10(){
      this.API.top10().then(res=>{
        this.top10List = res.data;
      })
    },
    onSearch() {
      this.API.searchVideo(this.value,this.page).then(res=>{
        this.list = [...this.list,...res.data.content];
        if(res.data.content.length < 20){
          this.$nextTick(()=>{
            this.$refs.movie.finished = true;
          })
        }
      })
    },

    onCancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  background: var(--bg);
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;

  .top10{
    padding-top: 5rem;
    width: 90%;
    margin-left: 5%;

    li{
      width: 100%;
      height: 9rem;
      background: val(--bg);
      display: flex;
      align-items: center;
      .hot{
        color: #f26d5f;
        font-weight: 600;
      }
      span{
        display: inline-block;
        height: 4rem;
        width: 4rem;
        font-size: 3rem;
        text-align: center;
        line-height: 4rem;
        border-radius: .5rem;
        margin-right: 1.7rem;
        color: #ff992f;
      }

      p{
        padding: 0;
        height: 5rem;
        line-height: 5rem;
        color: var(--cl);
        font-size: 3rem;
      }
    }
  }
  ::v-deep .van-search__action{
    color: #847cb2;
  }
  .form {
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
  }
}
</style>