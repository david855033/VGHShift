<template>
  <div class="input-group input-group-sm add-book-date p-0 ml-2">
    <div class="input-group-prepend  py-0">
      <button class="btn btn-info py-0 px-1" type="button" @click="onAdd">新增</button>
    </div>
    <input type="text" class="form-control py-0 " placeholder="日期:理由" v-model="value" @keydown.enter="onAdd">
  </div>
</template>
<script>
export default {
  data() {
    return { value: "" };
  },
  methods: {
    onAdd(event) {
      let vm = this;
      let date = 0;
      let description = "";
      let splitted = vm.value.split(":");
      date = Number(splitted.shift());
      description = splitted.join(":");
      if (date&&_.isNumber(date)&&!_.isNaN(date)&&date<=31) {
        vm.$emit("add", { date, description });
        vm.value = "";
      }
    }
  }
};
</script>
<style scoped>
.add-book-date {
  width: 120px;
}
</style>

