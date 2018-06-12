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
              過濾器：
              <div class="form-check form-check-inline" v-for="(e, i) in distinctAreaAbbr" :key="i">
                <input class="form-check-input" tabindex="-1" type="checkbox" :id="'inlineCheckboxArea'+i" :value="e" v-model="checkedArea">
                <label class="form-check-label" :for="'inlineCheckboxArea'+i">{{e}}</label>
              </div>
            </td>
          </tr>
          <tr v-for="(area,y) in selectedArea" :key="y">
            <td class="col-description">{{area.description}}</td>
            <td class="col-abbr">{{area.area_abbr}}</td>
            <td class="cell" v-for="(e,x) in calenderByYearMonth(sheetYear,sheetMonth)" :key="x" @click="focus(x,y)">
              <input type="text" v-show="true" :x="x" :y="y" @keydown.prevent="onAnyKey($event, e,'area', area)" @focus="focus(x, y)" :value="((areaMatrix[y]||[])[x]||{}).doctor_abbr">
            </td>
          </tr>
          <tr>
            <td :colspan="2">以人排區</td>
            <td :colspan="calenderByYearMonth(sheetYear,sheetMonth).length">
              過濾器：
              <div class="form-check form-check-inline" v-for="(e, i) in distrinctDoctorGrade" :key="i">
                <input class="form-check-input" tabindex="-1" type="checkbox" :id="'inlineCheckboxGrade'+i" :value="e" v-model="checkedDoctor">
                <label class="form-check-label" :for="'inlineCheckboxGrade'+i">{{e}}</label>
              </div>
            </td>
          </tr>
          <tr v-for="(doctor,y) in selectedDoctor" :key="y+selectedArea.length">
            <td class="col-description">{{doctor.name}}</td>
            <td class="col-abbr">{{doctor.doctor_abbr}}</td>
            <td class="cell" v-for="(e,x) in calenderByYearMonth(sheetYear,sheetMonth)" :key="x" @click="focus(x,y+selectedArea.length)">
              <input type="text" v-show="true" :x="x" :y="y+selectedArea.length" @keydown.prevent="onAnyKey($event,e,'doctor' ,doctor)" @focus="focus(x, y+selectedArea.length)" :value="((doctorMatrix[y]||[])[x]||{}).area_abbr" @input="onDoctorInput($event,y,x)">
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
    return {
      focus_y: "",
      focus_x: "",
      checkedArea: [],
      checkedDoctor: [],
      areaMatrix: [],
      doctorMatrix: []
    };
  },
  computed: {
    ...mapGetters({
      calenderByYearMonth: "getCalenderByYearMonth"
    }),
    selectedArea() {
      let vm = this;
      if (vm.checkedArea.length == 0) {
        return vm.sheetContent.areaList;
      } else {
        return vm.sheetContent.areaList.filter(
          x => vm.checkedArea.indexOf(x.area_abbr) >= 0
        );
      }
    },
    selectedDoctor() {
      let vm = this;
      if (vm.checkedDoctor.length == 0) {
        return vm.sheetContent.doctorList;
      } else {
        return vm.sheetContent.doctorList.filter(
          x => vm.checkedDoctor.indexOf(x.grade) >= 0
        );
      }
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
      let focus_input = $(
        "input[x = " + this.focus_x + "][y = " + this.focus_y + "]"
      );
      focus_input.select();
    },
    resetfocus() {
      let focus_input = $(
        "input[x = " + this.focus_x + "][y = " + this.focus_y + "]"
      );
      focus_input.focus();
    },
    onDoctorInput(e, y, x) {
      let doctorMatrix = this.doctorMatrix;
      e.target.value = ((doctorMatrix[y] || [])[x] || {}).area_abbr;
    },
    onAnyKey(e, dateElement, updateType, rowElement) {
      let vm = this;
      let doctorList = vm.sheetContent.doctorList;
      let selectedDoctor = vm.selectedDoctor;
      let doctorMatrix = vm.doctorMatrix;
      let areaList = vm.sheetContent.areaList;
      let selectedArea = vm.selectedArea;
      let areaMatrix = vm.areaMatrix;

      let charCode = e.key.charCodeAt(0);
      let value = String.fromCharCode(charCode);
      let date = new Date(dateElement.date).getDate();

      if (!e.shiftKey && !e.ctrlKey) {
        if (e.code == "ArrowDown") {
          vm.onDown();
        } else if (e.code == "ArrowUp") {
          vm.onUp();
        } else if (e.code == "ArrowLeft") {
          vm.onLeft();
        } else if (e.code == "Backspace" || e.code == "Delete") {
          //TODO DELETE DUTY
          if (updateType == "doctor") {
            //delete in doctor cell
            let doctor = rowElement;
            let y = selectedDoctor.findIndex(
              x => x.doctor_abbr == doctor.doctor_abbr
            );
            let area_abbr = doctorMatrix[y][date - 1].area_abbr;
            let matchArea = areaList.filter(x => x.area_abbr == area_abbr);
            matchArea.forEach(area => {
              vm.arrange_ViewMatrix(area, date, doctor, true);
              vm.arrange_AreaList(area, date, doctor, true);
            });
          } else if (updateType == "area") {
            //todo: delete in area cell
            let area = rowElement;
            let y = selectedArea.findIndex(x => x.area_abbr == area.area_abbr);
            let doctor_abbr = areaMatrix[y][date - 1].doctor_abbr;
            let matchDoctor = doctorList.filter(
              x => x.doctor_abbr == doctor_abbr
            );
            matchDoctor.forEach(doctor => {
              vm.arrange_ViewMatrix(area, date, doctor, true);
              vm.arrange_AreaList(area, date, doctor, true);
            });
          }
          if (e.code == "Backspace") {
            vm.onLeft();
          } else {
            vm.onRight();
          }
        } else if (e.code == "ArrowRight" || e.code == "Tab") {
          vm.onRight();
        }
      }
      if (e.key.length == 1 && !e.ctrlKey) {
        if (
          (charCode >= 65 && charCode <= 90) ||
          (charCode >= 97 && e.keyCode <= 122) ||
          (charCode >= 48 && e.keyCode <= 57)
        ) {
          let updated = false;
          if (updateType == "doctor") {
            //change in doctor cell
            let doctor = rowElement;
            let matchArea = selectedArea.filter(x => x.area_abbr == value);
            matchArea.forEach(area => {
              vm.arrange_ViewMatrix(area, date, doctor);
              vm.arrange_AreaList(area, date, doctor);
              updated = true;
            });
          } else if (updateType == "area") {
            //todo: change in area cell
            let area = rowElement;
            let matchDoctor = selectedDoctor.filter(
              x => x.doctor_abbr == value
            );
            matchDoctor.forEach(doctor => {
              vm.arrange_ViewMatrix(area, date, doctor);
              vm.arrange_AreaList(area, date, doctor);
              updated = true;
            });
          }

          updated && vm.onRight();
        }
      }
    },
    arrange_ViewMatrix(area, date, doctor, clear) {
      let vm = this;
      let areaList = vm.sheetContent.areaList;
      let selectedArea = vm.selectedArea;
      let areaMatrix = vm.areaMatrix;
      let selectedDoctor = vm.selectedDoctor;
      let doctorMatrix = vm.doctorMatrix;

      let x = date - 1;
      let y_area = selectedArea.findIndex(x => {
        return x.area_abbr == area.area_abbr;
      });
      let y_doctor = selectedDoctor.findIndex(x => {
        return x.doctor_abbr == doctor.doctor_abbr;
      });
      //rendering matched cell in areaMatrix
      areaMatrix[y_area][x].doctor_abbr = clear ? "" : doctor.doctor_abbr;
      //rendering matched cell in doctorMatrix
      doctorMatrix[y_doctor][x].area_abbr = clear ? "" : area.area_abbr;
    },
    arrange_AreaList(area, date, doctor, clear) {
      let x = date - 1;
      let array = JSON.parse(area.arranged_duty);
      array[x] = clear ? "" : doctor.doctor_id;
      area.arranged_duty = JSON.stringify(array);
    },
    renderAreaMatrix() {
      let vm = this;
      let selectedArea = vm.selectedArea;
      let areaMatrix = vm.areaMatrix;
      selectedArea.forEach((e, y) => {
        vm.$set(areaMatrix, y, []);
        vm.calenderByYearMonth(vm.sheetYear, vm.sheetMonth).forEach((d, x) => {
          vm.$set(areaMatrix[y], x, { doctor_abbr: "" });
        });
      });
    },
    renderDoctorMatrix() {
      let vm = this;
      let selectedDoctor = vm.selectedDoctor;
      let doctorMatrix = vm.doctorMatrix;
      selectedDoctor.forEach((e, y) => {
        vm.$set(doctorMatrix, y, []);
        vm.calenderByYearMonth(vm.sheetYear, vm.sheetMonth).forEach((d, x) => {
          vm.$set(doctorMatrix[y], x, { area_abbr: "" });
        });
      });
    },
    onUp() {
      this.focus_y > 0 && (this.focus_y -= 1);
      this.resetfocus();
    },
    onDown() {
      this.focus_y <
        this.selectedDoctor.length + this.selectedArea.length - 1 &&
        (this.focus_y += 1);
      this.resetfocus();
    },
    onLeft() {
      this.focus_x > 0 && (this.focus_x -= 1);
      this.resetfocus();
    },
    onRight() {
      this.focus_x <
        this.calenderByYearMonth(this.sheetYear, this.sheetMonth).length - 1 &&
        (this.focus_x += 1);
      this.resetfocus();
    }
  },
  mounted() {
    this.renderAreaMatrix();
    this.renderDoctorMatrix();
  },
  watch: {
    checkedArea: {
      handler() {
        this.renderAreaMatrix();
      },
      deep: true
    },
    checkedDoctor: {
      handler() {
        this.renderDoctorMatrix();
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.table {
  margin: auto;
}
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
table {
  max-width: 1000px;
}
td.col-abbr {
  width: 40px;
  background: whitesmoke;
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
