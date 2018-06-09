<template>
  <div>
    <h5>排班區</h5>
    <div id="table-container" class="mr-3">
      <table class="table table-sm">
        <thead>
          <tr>
            <th colspan="2">日期</th>
            <th v-for="(e,i) in calenderByYearMonth(sheetYear,sheetMonth)" :key="i">{{new Date(e.date).getDate()}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">以區排人</td>
            <td :colspan="calenderByYearMonth(sheetYear,sheetMonth).length">
              <div class="form-check form-check-inline" v-for="(e, i) in distinctAreaAbbr" :key="i">
                <input class="form-check-input" tabindex="-1" type="checkbox" :id="'inlineCheckboxArea'+i" :value="e" v-model="checkedArea">
                <label class="form-check-label" :for="'inlineCheckboxArea'+i">{{e}}</label>
              </div>
            </td>
          </tr>
          <tr v-for="(area,y) in sheetContent.areaList.filter(x=>checkedArea.indexOf(x.area_abbr)>=0)" :key="y">
            <td>{{area.description}}</td>
            <td>{{area.area_abbr}}</td>
            <td class="cell" v-for="(e,x) in calenderByYearMonth(sheetYear,sheetMonth)" :key="x" @click="focus(x,y)">
              <input type="text" v-show="true" :x="x" :y="y" @keydown.up="onUp" @keydown.down="onDown" @keydown.enter="onDown" @keydown.left="onLeft" @keydown.right="onRight" @focus="focus(x, y)">
            </td>
          </tr>
          <tr>
            <td :colspan="2">以人排區</td>
            <td :colspan="calenderByYearMonth(sheetYear,sheetMonth).length">
              <div class="form-check form-check-inline" v-for="(e, i) in distrinctDoctorGrade" :key="i">
                <input class="form-check-input" tabindex="-1" type="checkbox" :id="'inlineCheckboxGrade'+i" :value="e" v-model="checkedDoctor">
                <label class="form-check-label" :for="'inlineCheckboxGrade'+i">{{e}}</label>
              </div>
            </td>
          </tr>
          <tr v-for="(doctor,y) in sheetContent.doctorList.filter(x=>checkedDoctor.indexOf( x.grade)>=0)" :key="y+areaListlength">
            <td>{{doctor.name}}</td>
            <td>{{doctor.doctor_abbr}}</td>
            <td class="cell" v-for="(e,x) in calenderByYearMonth(sheetYear,sheetMonth)" :key="x" @click="focus(x,y+areaListlength)">
              <input type="text" v-show="true" :x="x" :y="y+areaListlength" @keydown.up="onUp" @keydown.down="onDown" @keydown.enter="onDown" @keydown.left="onLeft" @keydown.right="onRight" @focus="focus(x, y+areaListlength)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["sheetContent", "sheetYear", "sheetMonth"],
  data() {
    return { focus_y: "", focus_x: "", checkedArea: [], checkedDoctor: [] };
  },
  computed: {
    ...mapGetters({
      calenderByYearMonth: "getCalenderByYearMonth"
    }),
    areaListlength() {
      let vm = this;
      return this.sheetContent.areaList.filter(
        x => vm.checkedArea.indexOf(x.area_abbr) >= 0
      ).length;
    },
    doctorListlength() {
      let vm = this;
      return this.sheetContent.doctorList.filter(
        x => vm.checkedDoctor.indexOf(x.grade) >= 0
      ).length;
    },
    distinctAreaAbbr() {
      let vm = this;
      let areaList = vm.sheetContent.areaList;
      let output = [];
      if (areaList) {
        areaList.forEach(e => {
          if (output.indexOf(e.area_abbr) < 0) output.push(e.area_abbr);
        });
      }
      return output;
    },
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
    focus(x, y) {
      this.focus_x = x;
      this.focus_y = y;
    },
    refocus() {
      $("input[x = " + this.focus_x + "][y = " + this.focus_y + "]").focus();
    },
    onUp() {
      this.focus_y > 0 && (this.focus_y -= 1);
      this.refocus();
    },
    onDown() {
      this.focus_y < this.doctorListlength + this.areaListlength - 1 &&
        (this.focus_y += 1);
      this.refocus();
    },
    onLeft() {
      this.focus_x > 0 && (this.focus_x -= 1);
      this.refocus();
    },
    onRight() {
      this.focus_x <
        this.calenderByYearMonth(this.sheetYear, this.sheetMonth).length - 1 &&
        (this.focus_x += 1);
      this.refocus();
    }
  }
};
</script>
<style scoped>
h5 {
  margin-top: 10px;
}
td,
th {
  padding: 0;
  margin: 0;
  white-space: nowrap;
}
th {
  text-align: center;
}
td.cell {
  width: 25px;
  max-width: 25px;
}
input[type="text"] {
  width: 25px;
  height: 25px;
  text-align: center;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
</style>
