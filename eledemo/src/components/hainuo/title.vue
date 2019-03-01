<template>
  <div>
    <div class="head1">
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
.head1 {
  width: 100%;
  background: #3190e8;
  height: 0.5rem;
  display: flex;
  align-items: center;
  z-index: 11;
}
.head1 > div {
  width: 50%;
  margin-left: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.head1 div {
  color: white;
}
.head1 {
  position: fixed;
  top: 0;
  left: 0;
}
</style>




