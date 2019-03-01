<template>
  <div>
    <tit></tit>
    <div class="content">
      <div>{{content}}</div>
    </div>
  </div>
</template>
<script>
import tit from "./title.vue";
export default {
  data() {
    return {
      content: null,
      name: null
    };
  },
  components: {
    tit
  },
  created() {
    this.content = this.$route.params.content;
    this.name = this.$route.params.name;
  }
};
</script>
<style scoped>
.content > div {
  width: 90%;
  margin: 0 auto;
}
.content {
  width: 100%;
  margin-top: 0.5rem;
}
</style>


