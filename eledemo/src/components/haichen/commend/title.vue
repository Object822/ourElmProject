<template>
  <div>
    <div class="header">
      <div>
        <div v-on:click="decrease">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div>{{name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: null
    };
  },
  methods: {
    decrease() {
      this.$router.go(-1);
    }
  },
  created() {
    console.log(this.$route);
    if (this.$route.params.username) {
      this.name = this.$route.params.username;
    }
  }
};
</script>
<style scoped>
.header {
  width: 100%;
  background: #3190e8;
  height: 0.5rem;
  display: flex;
  align-items: center;
  font-size: .16rem;
  font-weight: bolder;
}
.header > div {
  width: 50%;
  margin-left: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header div {
  color: white;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
}
</style>




