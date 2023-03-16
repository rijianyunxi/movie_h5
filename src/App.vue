<template>
  <div class="main" id="app">
    <keep-alive include="HomeView">
       <router-view/>
    </keep-alive>
  </div>
</template>

<style lang="less" scoped>
  .main{
    height: 100vh;
  }
</style>
