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
  display: flex;
  flex-direction: row
}
#left-col {
  flex: 0 0 240px;
}
#right-col{
  flex: 1 1 auto;
  overflow: auto;
}
</style>
