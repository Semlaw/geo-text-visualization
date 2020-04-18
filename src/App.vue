<template>
  <div class="full-container">
    <Aside />
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Aside from "./Layout/aside";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Aside
    // HelloWorld
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body,
html {
  margin: 0;
}
.full-container {
  height: 100vh;
  display: flex;
}
.main-container {
  height: 100vh;
  overflow-y: auto;
  flex: 1;
}
</style>
