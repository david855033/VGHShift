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
                        <button class="btn btn-sm btn-primary" @click='onLoadAreaListFromSheet(sheet)'>load and replace</button>
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
        <table class="table table-sm" id="area-list-table">
            <thead>
                <tr>
                    <th>area_id</th>
                    <th>type_id</th>
                    <th>workhour_id</th>
                    <th>area_abbr</th>
                    <th>description</th>
                    <th>available_grades</th>
                    <th>pregnant_cover</th>
                    <th>功能</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(area,i) in sheetContent.areaList" :key="i">
                    <td>{{area.area_id}}</td>
                    <td>
                        <select v-model="area.type_id">
                            <option v-for="(type, ti) in sheetContent.typeList" :key="ti">{{type.type_id}}</option>
                        </select>
                    </td>
                    <td>
                        <select v-model="area.workhour_id">
                            <option value=""></option>
                            <option v-for="(workhour, ti) in sheetContent.workhourList" :key="ti">{{workhour.workhour_id}}</option>
                        </select>
                    </td>
                    <td><input type="text" class="area-abbr" v-model="area.area_abbr"></td>
                    <td><input type="text" v-model="area.description"></td>
                    <td>
                        <div class="form-check form-check-inline" v-for="(grade, j) in distrinctDoctorGrade" :key="i+'-'+j">
                            <input class="form-check-input" type="checkbox" :id="'checkGrade'+i+'-'+j" :value="grade" v-model="area.available_grades_array" @change="changeAvailableGrades(area)">
                            <label class="form-check-label" :for="'checkGrade'+i+'-'+j">{{grade}}</label>
                        </div>
                    </td>
                    <td>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="checkbox" :id="'pregnant'+i" v-model="area.pregnant_cover">
                            <label class="form-check-label" :for="'pregnant'+i">懷孕cover</label>
                        </div>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-primary" @click="deleteFromAreaList(area)">刪除</button>
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
  computed: {
    ...mapGetters({
      typeByUserSection: "getTypeByUserSection",
      lastPublishedSheetByUserSection: "getLastPublishedSheetByUserSection"
    }),
    distrinctDoctorGrade() {
      let vm = this;
      let doctorList = vm.sheetContent.doctorList;
      let output = [];
      if (doctorList) {
        doctorList.forEach(e => {
          if (output.indexOf(e.grade) < 0) output.push(e.grade);
        });
      }
      return output;
    }
  },
  methods: {
    onLoadAreaListFromSheet(sheet) {
      let vm = this;
      if (!sheet.content) {
        return;
      }
      let source_sheetContent = JSON.parse(sheet.content);
      if (source_sheetContent.areaList) {
        vm.sheetContent.areaList.splice(0, vm.sheetContent.areaList.length);
        source_sheetContent.areaList.forEach(area => vm.addFromAreaList(area));
      }
    },
    addFromAreaList(area) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.areaList) return;
      let {
        area_id,
        type_id,
        workhour_id,
        area_abbr,
        description,
        available_grades,
        pregnant_cover
      } = area;
      let newArea = {
        area_id,
        type_id,
        workhour_id,
        area_abbr,
        description,
        available_grades,
        available_grades_array: JSON.parse(available_grades),
        pregnant_cover
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
        available_grades_array: []
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
    },
    changeAvailableGrades(area) {
      area.available_grades = JSON.stringify(area.available_grades_array);
    }
  }
};
</script>

<style lang="scss" scoped>
h5 {
  margin-top: 10px;
}
#area-list-table input[type="text"] {
  height: 25px;
  text-align: center;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
input.workhour-id {
  width: 100px;
  text-align: center;
}
input.area-abbr {
  width: 30px;
  text-align: center;
}
</style>


