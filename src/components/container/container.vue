<template>
  <div id="root">
    <div id="left-col">
      <side-menu></side-menu>
    </div>
    <div id="right-col">
      <router-view id="router-view"></router-view>
    </div>
  </div>
</template>

<script>
import SideMenu from "./side-menu";
export default {
  components: {
    SideMenu
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
#root{
  height: 100%;
}
#left-col {
  float: left;
  height: 100%;
  width: 20%;
}
#right-col{
  float: right;
  width: 80%;
}
</style>
