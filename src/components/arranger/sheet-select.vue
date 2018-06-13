<template>
  <div id="sheet-select-root">
    <div id="sheet-selector" v-if="selectedSheetID==''">
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
            <th>功能</th>
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
            <td><button @click.stop>branch</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="selectedSheetID!=''">
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
        <router-link tag="button" :to="'/sheet-select/area-arrange'" type="button" class="btn btn-sm btn-primary">area-arrange</router-link>
        <router-link tag="button" :to="'/sheet-select/shift-arrange'" type="button" class="btn btn-sm btn-primary">shift-arrange</router-link>
        <button type="button" class="btn btn-sm btn-primary">save</button>
        <router-link tag="button" :to="'/sheet-select'" type="button" class="btn btn-sm btn-primary" @click.native="clearSelect">go back</router-link>
      </div>
      <router-view id="manipulate" :sheet-content.sync="selectedSheetContent" :sheet-year.sync="selectedSheetYear" :sheet-month.sync="selectedSheetMonth"></router-view>
    </div>
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
    getSheetByID: "getSheetByID",
    calenderByYearMonth: "getCalenderByYearMonth"
  }),
  methods: {
    selectSheet(sheet_id) {
      let vm = this;
      let selectedSheet = vm.getSheetByID("S01");

      //--初始化SheetContent--//
      let selectedSheetContent_ToLoad = {
        doctorList: [],
        typeList: [],
        workhourList: [],
        calender: [],
        areaList: []
      };
      let calender = vm.calenderByYearMonth(
        selectedSheet.year,
        selectedSheet.month
      );
      calender.forEach(element => {
        selectedSheetContent_ToLoad.calender.push(element);
      });
      //初始化sheetContent結束

      if (selectedSheet) {
        vm.selectedSheetID = selectedSheet.sheet_id;
        vm.selectedSheetYear = selectedSheet.year;
        vm.selectedSheetMonth = selectedSheet.month;
        if (selectedSheet.content) {
          selectedSheetContent_ToLoad = JSON.parse(selectedSheet.content);
        }
      } else {
        //沒選擇表單:將selectedSheet清空
        vm.selectedSheetID = "";
        vm.selectedSheetYear = "";
        vm.selectedSheetMonth = "";
      }
      vm.selectedSheetContent = selectedSheetContent_ToLoad;
    },
    clearSelect() {
      this.selectedSheetID = "";
      this.selectedSheetYear = "";
      this.selectedSheetMonth = "";
      this.selectedSheetContent = {};
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



