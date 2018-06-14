<template>
    <div class="input-group input-group-sm add-book-date p-0 ml-2">
        <div class="input-group-prepend  py-0">
            <button class="btn btn-info py-0 px-1" type="button" @click="onAdd">新增</button>
        </div>
        <input type="text" class="form-control py-0 " placeholder="日期:理由" v-model="value">
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
      vm.$emit("add", vm.value);
    }
  }
};
</script>
<style scoped>
.add-book-date {
  width: 120px;
}
</style>

