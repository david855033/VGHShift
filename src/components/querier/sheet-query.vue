<template>
    <div>
        <div id="sheet-selector"  v-if="!selectedSheet.sheet_id">
            <h4>Sheet Select (publish sheet)</h4>
            <button class='btn btn-sm btn-primary py-0 my-2' @click="querySheetList">Query</button>
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
                    <tr v-for="(sheet,i) in sheetQueryResult" :key="i" @click="selectSheet(sheet.sheet_id)">
                        <td>{{sheet.sheet_id}}</td>
                        <td>{{sheet.year}}</td>
                        <td>{{sheet.month}}</td>
                        <td>{{sheet.section}}</td>
                        <td>{{sheet.version}}</td>
                        <td>{{sheet.status}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="buttons" v-if="selectedSheet.sheet_id">
            <router-link tag="button" :to="'/sheet-query/sheet-view'" type="button" class="btn btn-sm btn-primary">傳統檢視</router-link>
            <router-link tag="button" :to="'/sheet-query'" type="button" class="btn btn-sm btn-primary" @click.native="clearSelect">go back</router-link>
        </div>
        <div class="views" v-if="selectedSheet.sheet_id">
            {{selectedSheet.sheet_id}}
            <router-view :sheet.sync="selectedSheet"></router-view>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      selectedSheet: {},
      sheetQueryResult: []
    };
  },
  //TODO
  computed: mapGetters({
    getSheetByID: "getSheetByID",
    querySheetListBy: "querySheetListBy"
  }),
  methods: {
    querySheetList() {
      let vm = this;
      vm.sheetQueryResult = vm.querySheetListBy();
    },
    selectSheet(sheet_id) {
      let vm = this;
      vm.selectedSheet = vm.getSheetByID(sheet_id); //從store中取出sheet
    },
    clearSelect() {
      let vm = this;
      vm.selectedSheet = {};
    }
  },
  mounted() {
    this.querySheetList();
  }
};
</script>


