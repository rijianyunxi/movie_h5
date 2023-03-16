<template>
  <div class="menu">
   <div class="_menu">
     <div class="menu_box">
            <span :class="{active:item.symbol === current}" @click="dealClick(item,index)" v-for="(item,index) in list" :key="index">{{ item.classificationName}}
            <img v-if="item.symbol === current" src="~@/assets/images/line.png" alt="">
        </span>
     </div>
     <div @click="onSearch" class="search_icon"></div>
   </div>
  </div>
</template>
    
<script>
export default {
  name: "Menu",
  data(){
    return{
        list:[],
        current:''
    }
  },
  created(){
    if(this.list.length > 0 && this.current) return false;
    let _symbol = sessionStorage.getItem("_symbol") || '';
    this.API.getClass().then(res=>{
        if(res.data.content.length > 0 ){
            this.list =  res.data.content;
            if(_symbol){
              this.current = _symbol;
              let tmp  = {};
              res.data.content.forEach(item=>{
                if(_symbol === item.symbol){
                  tmp = item;
                }
              })
              this.$emit("check",tmp)
            }else{
              let tmp = res.data.content[0];
              this.current = tmp.symbol;
              sessionStorage.setItem("_symbol",tmp.symbol)
              this.$emit("check",tmp)
            }
        }
    })

    // this.list = [
    //     {symbol:11,classificationName:'首页'},
    //     {symbol:22,classificationName:'电影'},
    //     {symbol:111,classificationName:'电视剧'},
    //     {symbol:1131,classificationName:'动漫'},
    //     {symbol:11221,classificationName:'韩剧'},
    //     {symbol:11771,classificationName:'美剧'},
    // ]
  },
  methods:{
    dealClick(item){
      this.current = item.symbol;
      sessionStorage.setItem("_symbol",item.symbol)
      this.$emit('check',item);
    },
    onSearch(){
      // let current = document.documentElement.classList.value;
      // document.documentElement.classList.remove(current);
      // document.documentElement.classList.add(current === 'dart' ? 'light' : 'dart');
      this.$router.push("/search");
    },
  }
};
</script>
    
<style lang="less" scoped>
.menu {
    background-color: var(--bg);
    width: 100%;
    height: 14rem;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 999;
  ._menu{
      width: 96%;
    margin-left: 2%;
      height: 14rem;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      border-bottom: 1px solid #484456;
    }
    .menu_box{
        &::-webkit-scrollbar { display:none !important }
        height: 10rem;
        flex: 1;
        overflow-y: hidden;
        overflow-x: auto;
        display: flex;
        .active{
            color: var(--cl);
            font-size: 3.2rem;
        }
        span{
            flex-shrink: 0;
            min-width: 12.5rem;
            font-size: 3rem;
            line-height: 10rem;
            text-align: center;
            color: #847cb2;
            display: inline-block;
            height: 10rem;
            box-sizing: border-box;
            padding: 0 1rem;
            position: relative;
            img{
                display: block;
                width: 7.5rem;
                position:absolute;
                bottom: -.4rem;
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
    .search_icon{
        height: 5rem;
        width: 5rem;
        margin:0 2rem;
        background: url("@/assets/images/search.png") no-repeat;
        background-size: 100% 100%;
    }
}
</style>