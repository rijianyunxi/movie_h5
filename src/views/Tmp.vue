<template>
  <div class="Tmp">
<!--    <Back :title="title"></Back>-->
  </div>
</template>

<script>
import Back from "@/components/Back";

export default {
  name: "Tmp",
  components: {Back},
  created() {
    let data  = this.$route.query;
    this.title = data.videoName;
    this.$router.replace({
      path:"/detail",
      query:data
    })
  },
  data() {
    return {
      title:""
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.Tmp {
  height: 100vh;
  width: 100%;
  background: var(--bg);
}
</style>