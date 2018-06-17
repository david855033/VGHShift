<template>
    <div>
        <div id="sheet-selector" v-if="selectedSheetID==''">
            <h4>Sheet Select (publish sheet)</h4>
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
                    <tr v-for="(sheet,i) in sheetQueryResult" :key="i">
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
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
        selectedSheetID:'',
        sheetQueryResult:[]
    };
  },
  computed: mapGetters({})
};
</script>


