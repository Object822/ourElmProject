<template>
  <div id="app">
    <!-- <transition name="router-fade" mode="out-in">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view :key="key"/>
      </keep-alive>
    </transition> -->
    <transition name="router-fade" mode="out-in">
      <router-view :key="key"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  computed: {
    key() {
      return this.$route.path + Math.random();
    }
  }
};
</script>

<style>
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter,
.router-fade-leave-active {
  opacity: 0;
}
</style>
