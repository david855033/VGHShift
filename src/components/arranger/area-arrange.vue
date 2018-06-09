<template>
    <div>
        <h5>本班表所使用班型</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>type_id</th>
                    <th>section</th>
                    <th>description</th>
                    <th>平平</th>
                    <th>平假</th>
                    <th>假平</th>
                    <th>假假</th>
                    <th>功能</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in sheetContent.typeList" :key="i">
                    <td>{{e.type_id}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.description}}</td>
                    <td>{{e.work_to_work}}</td>
                    <td>{{e.work_to_holiday}}</td>
                    <td>{{e.holiday_to_work}}</td>
                    <td>{{e.holiday_to_holiday}}</td>
                    <td>
                        <button type="button" class="btn btn-sm py-0" @click="createAreaFromTypeList(e)">新增值班區域</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h5>本班表所使用上班日工時</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>workhour_id</th>
                    <th>section</th>
                    <th>description</th>
                    <th>start_work</th>
                    <th>end_work</th>
                    <th>nap</th>
                    <th>pm_off</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in sheetContent.workhourList" :key="i">
                    <td>{{e.workhour_id}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.description}}</td>
                    <td>{{e.start_work}}</td>
                    <td>{{e.end_work}}</td>
                    <td>{{e.nap}}</td>
                    <td>{{e.pm_off}}</td>
                </tr>
            </tbody>
        </table>
        <h5>值班區域</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>type_id</th>
                    <th>workhour_id</th>
                    <th>area_abbr</th>
                    <th>description</th>
                    <th>available_grades</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in sheetContent.areaList" :key="i">
                    <td>{{e.type_id}}</td>
                    <td><input type="text" class="workhour-id" v-model="e.workhour_id"></td>
                    <td><input type="text" class="area-abbr" v-model="e.area_abbr"></td>
                    <td><input type="text" v-model="e.description"></td>
                    <td>
                        <div v-for="(grade, g) in JSON.parse(e.available_grades)" :key="g">
                            {{grade}}
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
import util from "@/components/my-util";

export default {
  props: ["sheetContent", "sheetYear", "sheetMonth"],
  computed: mapGetters({
    typeByUserSection: "getTypeByUserSection"
  }),
  methods: {
    createAreaFromTypeList(e) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.areaList) return;
      let newArea = {
        type_id: e.type_id,
        description: "__description__",
        available_grades: JSON.stringify(["R1", "R2", "R3"])
      };
      sheetContent.areaList.push(newArea);
    }
  }
};
</script>

<style lang="scss" scoped>
h5 {
  margin-top: 10px;
}
input.workhour-id {
  width: 100px;
  text-align: center;
}
input.area-abbr {
  width: 60px;
  text-align: center;
}
</style>


