<template>
    <div>
        <h5>從先前班表載入</h5>
        <table class="table table-sm">
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
                <tr v-for="(sheet,i) in lastPublishedSheetByUserSection" :key="i">
                    <td>{{sheet.sheet_id}}</td>
                    <td>{{sheet.year}}</td>
                    <td>{{sheet.month}}</td>
                    <td>{{sheet.section}}</td>
                    <td>{{sheet.version}}</td>
                    <td>{{sheet.status}}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" @click='onLoadAreaListFromSheet(sheet)'>load</button>
                    </td>
                </tr>
            </tbody>
        </table>

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
                    <th>area_id</th>
                    <th>type_id</th>
                    <th>workhour_id</th>
                    <th>area_abbr</th>
                    <th>description</th>
                    <th>available_grades</th>
                    <th>功能</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in sheetContent.areaList" :key="i">
                    <td>{{e.area_id}}</td>
                    <td>{{e.type_id}}</td>
                    <td><input type="text" class="workhour-id" v-model="e.workhour_id"></td>
                    <td><input type="text" class="area-abbr" v-model="e.area_abbr"></td>
                    <td><input type="text" v-model="e.description"></td>
                    <td>
                        <div v-for="(grade, g) in JSON.parse(e.available_grades)" :key="g">
                            {{grade}}
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-primary" @click="deleteFromAreaList(e)">刪除</button>
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
    typeByUserSection: "getTypeByUserSection",
    lastPublishedSheetByUserSection: "getLastPublishedSheetByUserSection"
  }),
  methods: {
    onLoadAreaListFromSheet(sheet) {
      let vm = this;
      if (!sheet.content) {
        return;
      }
      let source_sheetContent = JSON.parse(sheet.content);
      if (source_sheetContent.areaList) {
        source_sheetContent.areaList.forEach(area => vm.addFromAreaList(area));
      }
    },
    addFromAreaList(area) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.areaList) return;
      if (_.some(sheetContent.areaList, x => x.description == area.description))
        return;
      let {
        type_id,
        workhour_id,
        area_abbr,
        description,
        available_grades
      } = area;
      let newArea = {
        type_id,
        workhour_id,
        area_abbr,
        description,
        available_grades
      };

      util.fill_AreaArrange(newArea, vm);
      sheetContent.areaList.push(newArea);
    },
    createAreaFromTypeList(e) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.areaList) return;
      let newArea = {
        type_id: e.type_id,
        description: "",
        available_grades: JSON.stringify(["R1", "R2", "R3"])
      };
      let id_list = sheetContent.areaList.map(x => {
        let match = x.area_id.match(/\d+/);
        if (_.isEmpty(match)) return 0;
        return match[0];
      });
      let next_area_id = Number(_.max(id_list) || 0) + 1;
      newArea.area_id = "A" + _.padStart(next_area_id, 2, "0");
      util.fill_AreaArrange(newArea, vm);
      sheetContent.areaList.push(newArea);
    },
    deleteFromAreaList(area) {
      let areaList = this.sheetContent.areaList;
      if (areaList) {
        let index = areaList.findIndex(x => x.area_id == area.area_id);
        areaList.splice(index, 1);
      }
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


