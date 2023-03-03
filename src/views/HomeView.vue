<template>
  <div class="home">
    <Menu @check="onMenuCheck"></Menu>
    <div v-for="(item,index) in plates" :key="index">
      <Title @showMore="showMore(item.plateName)" :title="item.plateName"></Title>
      <Movie :list="item.videos"></Movie>
    </div>

<!--    <Title @showMore="showMore('火爆推荐')" title="火爆推荐"></Title>-->
<!--    <Movie :list="list"></Movie>-->
  </div>
</template>

<script>

import Title from "@/components/Title.vue";
import Movie from "@/components/Movie.vue"
import Menu from "@/components/Menu.vue"

export default {
  name: "HomeView",
  components: { Title,Movie,Menu},
  created() {

  },
  data() {
    return {
      current:"",
      plates:[],
      list: [
        {
          name: "111",
          pic: "https://img01.yzcdn.cn/vant/apple-8.jpg",
          duration: "77876",
        },
        { name: "222", pic: "https://img01.yzcdn.cn/vant/apple-7.jpg" },
        { name: "33", pic: "https://img01.yzcdn.cn/vant/apple-1.jpg" },
        { name: "44", pic: "https://img01.yzcdn.cn/vant/apple-2.jpg" },
      ],
    };
  },
  methods: {
    onSearch() {
      this.$router.push("/search");
    },
    getHomePlate(){
      this.API.getClassMovies4(this.current).then(res=>{
        this.plates = res.data;
      })
    },
    onMenuCheck(item) {
      this.current = item.symbol;
      this.getHomePlate()
    },
    showMore(plate) {
      this.$router.push({
        path: "/more",
        query: {
          plate
        },
      });
    },
  },
};
</script>


<style lang="less" scoped>
.home {
  background-color: var(--bg);
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding-top: 15rem;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar{
    display: none;
  }
  ::v-deep .title{
    width: 97%;
    margin: 3rem 1.5% .5rem 1.5%;
  }
}
</style>