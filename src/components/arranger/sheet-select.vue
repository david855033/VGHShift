<template>
  <div id="sheet-select-root">
    <div id="sheet-selector">
      <h4>Sheet Select (from sheets filtered by user's arrange_section)</h4>
      <table class="table">
        <thead>
          <tr>
            <th>sheet_id</th>
            <th>year</th>
            <th>month</th>
            <th>section</th>
            <th>version</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(e,i) in sheetByUserSection" :key="i" @click="selectSheet(e.sheet_id)">
            <td>{{e.sheet_id}}</td>
            <td>{{e.year}}</td>
            <td>{{e.month}}</td>
            <td>{{e.section}}</td>
            <td>{{e.version}}</td>
            <td>{{e.status}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="selected-sheet">
      <h5>Selected Sheet</h5>
      <div>
        ID: {{selectedSheetID}}
      </div>
    </div>
    <div id="buttons">
      <router-link tag="button" :to="'/sheet-select/doctor-arrange'" type="button" class="btn btn-sm btn-primary">doctor-arrange</router-link>
      <router-link tag="button" :to="'/sheet-select/type-arrange'" type="button" class="btn btn-sm btn-primary">type-arrange</router-link>
      <router-link tag="button" :to="'/sheet-select/workhour-arrange'" type="button" class="btn btn-sm btn-primary">workhour-arrange</router-link>
      <router-link tag="button" :to="'/sheet-select/shift-arrange'" type="button" class="btn btn-sm btn-primary">shift-arrange</router-link>
      <router-link tag="button" :to="'/sheet-select'" type="button" class="btn btn-sm btn-primary">go back</router-link>
    </div>
    <router-view id="manipulate" :sheet-content.sync="selectedSheetContent" :sheet-year.sync="selectedSheetYear" :sheet-month.sync="selectedSheetMonth"></router-view>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedSheetID: "",
      selectedSheetYear: "",
      selectedSheetMonth: "",
      selectedSheetContent: {}
    };
  },
  computed: mapGetters({
    sheetByUserSection: "getSheetByUserSection",
    getSheetByID: "getSheetByID"
  }),
  methods: {
    selectSheet(sheet_id) {
      let vm = this;
      let selectedSheet = vm.getSheetByID("S01");
      let selectedSheetContent = {};

      if (selectedSheet) {
        vm.selectedSheetID = selectedSheet.sheet_id;
        vm.selectedSheetYear = selectedSheet.year;
        vm.selectedSheetMonth = selectedSheet.month;
        if (selectedSheet.content) {
          vm.selectedSheetContent = JSON.parse(selectedSheet.content);
        } else {
          vm.selectedSheetContent = {};
        }
      } else {
        vm.selectedSheetID = "";
        vm.selectedSheetYear = "";
        vm.selectedSheetMonth = "";
        vm.selectedSheetContent = {};
      }
      selectedSheetContent.doctorList = selectedSheetContent.doctorList || [];
      vm.selectedSheetContent = selectedSheetContent;
    }
  }
};
</script>
<style scoped lang='scss'>
#selected-sheet {
  h5,
  div {
    display: inline-block;
  }
}
</style>



