<template>
    <div>
        <h5>從預設醫師清單載入 (doctorList filtered by user arrange_section)</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>doctor_id</th>
                    <th>name</th>
                    <th>grade</th>
                    <th>section</th>
                    <th>code</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in doctorByUserSection" :key="i">
                    <td>{{e.doctor_id}}</td>
                    <td>{{e.name}}</td>
                    <td>{{e.grade}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.code}}</td>
                    <td>
                        <button class="btn btn-sm py-0" @click="addFromDoctorList(e)">加入</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h5>從先前班表載入</h5>
        /*todo 顯示出最近兩個月班表，提供載入功能*/
        <h5>本次排班醫師清單</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>doctor_id</th>
                    <th>section</th>
                    <th>grade</th>
                    <th>name</th>
                    <th>code</th>
                    <th>group</th>
                    <th>bookdate</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in sheetContent.doctorList" :key="i">
                    <td>{{e.doctor_id}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.grade}}</td>
                    <td>{{e.name}}</td>
                    <td>{{e.code}}</td>
                    <td>{{e.group}}</td>
                    <td>{{e.bookdate}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

let inArray = function(array, predicate) {
  var length = array.length;
  for (var i = 0; i < length; i++) {
    if (predicate(array[i])) return true;
  }
  return false;
};

export default {
  props: ["sheetContent"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      doctorByUserSection: "getDoctorByUserSection"
    })
  },
  methods: {
    addFromDoctorList(e) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.doctorList) return;
      let isAlreadyInList = inArray(
        sheetContent.doctorList,
        x => x.doctor_id == e.doctor_id
      );
      if (!isAlreadyInList) {
        let { doctor_id } = e;
        sheetContent.doctorList.push({ doctor_id });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
h5 {
  margin-top: 10px;
}
</style>


