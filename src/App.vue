<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "@/styles/custom-bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
html,
body {
  height: 100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, "Microsoft JhengHei", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
