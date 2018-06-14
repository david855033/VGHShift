<template>
  <div>
    <h5>排班區</h5>
    <div id="table-container" class="mr-3">
      <table class="table table-sm">
        <thead>
          <tr>
            <th colspan="2">日期</th>
            <th v-for="(e,i) in sheetContent.calender" :key="i">{{new Date(e.date).getDate()}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colspan="2">以區排人</td>
            <td :colspan="sheetContent.calender.length">
              過濾器：
              <div class="form-check form-check-inline" v-for="(e, i) in distinctAreaAbbr" :key="i">
                <input class="form-check-input" tabindex="-1" type="checkbox" :id="'inlineCheckboxArea'+i" :value="e" v-model="checkedArea">
                <label class="form-check-label" :for="'inlineCheckboxArea'+i">{{e}}</label>
              </div>
            </td>
          </tr>
          <tr v-for="(area,y) in selectedArea" :key="y">
            <td class="col-description" @click="setAssignArea(area)">{{area.description}}</td>
            <td class="col-abbr" @click="setAssignArea(area)">{{area.area_abbr}}</td>
            <td class="cell" v-for="(e,x) in sheetContent.calender" :key="x" @click="focus(x,y)">
              <input type="text" v-show="true" :x="x" :y="y" @keydown.prevent="onAnyKey($event, e,'area', area)" @focus="focus(x, y)" :value="((areaMatrix[y]||[])[x]||{}).doctor_abbr" @input="onAreaInput($event,y,x)" @click="onAreaCellClick(area,x)">
            </td>
          </tr>
          <tr>
            <td :colspan="2">以人排區</td>
            <td :colspan="sheetContent.calender.length">
              過濾器：
              <div class="form-check form-check-inline" v-for="(e, i) in distrinctDoctorGrade" :key="i">
                <input class="form-check-input" tabindex="-1" type="checkbox" :id="'inlineCheckboxGrade'+i" :value="e" v-model="checkedDoctor">
                <label class="form-check-label" :for="'inlineCheckboxGrade'+i">{{e}}</label>
              </div>
            </td>
          </tr>
          <tr v-for="(doctor,y) in selectedDoctor" :key="y+selectedArea.length">
            <td class="col-description" @click="setAssignDoctor(doctor)">{{doctor.name}}</td>
            <td class="col-abbr" @click="setAssignDoctor(doctor)">{{doctor.doctor_abbr}}</td>
            <td class="cell" v-for="(e,x) in sheetContent.calender" :key="x" @click="focus(x,y+selectedArea.length)">
              <input type="text" v-show="true" :x="x" :y="y+selectedArea.length" @keydown.prevent="onAnyKey($event,e,'doctor' ,doctor)" @focus="focus(x, y+selectedArea.length)" :value="((doctorMatrix[y]||[])[x]||{}).area_abbr" @input="onDoctorInput($event,y,x)" @click="onDoctorCellClick(doctor,x)">
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: ["sheetContent", "sheetYear", "sheetMonth"],
  data() {
    return {
      focus_y: "",
      focus_x: "",
      checkedArea: [],
      checkedDoctor: [],
      areaMatrix: [],
      doctorMatrix: [],
      assignArea: {},
      assignDoctor: {}
    };
  },
  computed: {
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
    setAssignArea(area) {
      this.assignDoctor = {};
      this.assignArea = this.assignArea == area ? {} : area;
    },
    setAssignDoctor(doctor) {
      this.assignArea = {};
      this.assignDoctor = this.assignDoctor == doctor ? {} : doctor;
    },
    onAreaCellClick(area, x) {
      let vm = this;
      let assignDoctor = vm.assignDoctor;
      if (assignDoctor.doctor_id) {
        vm.arrange_ViewMatrix(area, x + 1, assignDoctor);
        vm.arrange_AreaList(area, x + 1, assignDoctor);
      }
    },
    onDoctorCellClick(doctor, x) {
      let vm = this;
      let assignArea = vm.assignArea;
      if (assignArea.type_id) {
        vm.arrange_ViewMatrix(assignArea, x + 1, doctor);
        vm.arrange_AreaList(assignArea, x + 1, doctor);
      }
    },
    resetfocus() {
      let focus_input = $(
        "input[x = " + this.focus_x + "][y = " + this.focus_y + "]"
      );
      focus_input.focus();
    },
    onAreaInput(e, y, x) {
      //to disable invalid key input action
      let areaMatrix = this.areaMatrix;
      e.target.value = ((areaMatrix[y] || [])[x] || {}).doctor_abbr;
    },
    onDoctorInput(e, y, x) {
      //to disable invalid key input action
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
            //update view and areaList
            matchArea.forEach(area => {
              vm.arrange_ViewMatrix(area, date, doctor);
              vm.arrange_AreaList(area, date, doctor);
              updated = true;
            });
          } else if (updateType == "area") {
            //change in area cell
            let area = rowElement;
            let matchDoctor = selectedDoctor.filter(
              x => x.doctor_abbr == value
            );

            //update view and areaList
            matchDoctor.forEach(doctor => {
              vm.arrange_ViewMatrix(area, date, doctor);
              vm.arrange_AreaList(area, date, doctor);
              updated = true;
            });
          }
          updated && vm.onRight();
        }
      }
      if (e.shiftKey && e.code == "Tab") {
        vm.onLeft();
      }
    },
    arrange_ViewMatrix(area, date, doctor, clear) {
      let vm = this;
      let areaList = vm.sheetContent.areaList;
      let selectedArea = vm.selectedArea;
      let areaMatrix = vm.areaMatrix;
      let selectedDoctor = vm.selectedDoctor;
      let doctorMatrix = vm.doctorMatrix;
      let doctorList = vm.sheetContent.doctorList;
      let x = date - 1;
      let y_area = selectedArea.findIndex(x => {
        return x.area_abbr == area.area_abbr;
      });
      let y_doctor = selectedDoctor.findIndex(x => {
        return x.doctor_abbr == doctor.doctor_abbr;
      });
      if (!clear) {
        //remove same doctor in areaMatrix
        areaMatrix.forEach((row, dupli_y) => {
          if (row[x].doctor_abbr == doctor.doctor_abbr) {
            row[x].doctor_abbr = "";
          }
        });
        //remove same area in doctorMatraix
        doctorMatrix.forEach(row => {
          if (row[x].area_abbr == area.area_abbr) {
            row[x].area_abbr = "";
          }
        });
      }
      //rendering matched cell in areaMatrix
      areaMatrix[y_area][x].doctor_abbr = clear ? "" : doctor.doctor_abbr;
      //rendering matched cell in doctorMatrix
      doctorMatrix[y_doctor][x].area_abbr = clear ? "" : area.area_abbr;
    },
    arrange_AreaList(area, date, doctor, clear) {
      let areaList = this.sheetContent.areaList;
      let x = date - 1;
      //remove duplicate
      if (!clear) {
        areaList.forEach(row => {
          let current_arranged_duty_array = JSON.parse(row.arranged_duty);
          if (current_arranged_duty_array[x] == doctor.doctor_id) {
            current_arranged_duty_array[x] = "";
          }
          row.arranged_duty = JSON.stringify(current_arranged_duty_array);
        });
      }
      //set new value
      let array = JSON.parse(area.arranged_duty);
      array[x] = clear ? "" : doctor.doctor_id;
      area.arranged_duty = JSON.stringify(array);
    },
    renderAreaMatrix() {
      let vm = this;
      let doctorList = vm.sheetContent.doctorList;
      let selectedArea = vm.selectedArea;
      let areaMatrix = vm.areaMatrix;
      selectedArea.forEach((area, y) => {
        vm.$set(areaMatrix, y, []);
        let arranged_duty_array = JSON.parse(area.arranged_duty) || [];
        vm.sheetContent.calender.forEach((d, x) => {
          let doctor_id = arranged_duty_array[x];
          let doctor_abbr =
            (doctorList.find(x => x.doctor_id == doctor_id) || {})
              .doctor_abbr || "";
          vm.$set(areaMatrix[y], x, { doctor_abbr: doctor_abbr }); //areaMatrix初始值
        });
      });
      this.assignArea = {};
    },
    renderDoctorMatrix() {
      let vm = this;
      let selectedDoctor = vm.selectedDoctor;
      let doctorMatrix = vm.doctorMatrix;
      let areaList = vm.sheetContent.areaList;
      selectedDoctor.forEach((doctor, y) => {
        vm.$set(doctorMatrix, y, []);
        vm.sheetContent.calender.forEach((d, x) => {
          vm.$set(doctorMatrix[y], x, { area_abbr: "" }); //doctorMatrix初始值
        });
      });
      areaList.forEach(area => {
        let arranged_duty_array = JSON.parse(area.arranged_duty) || [];
        arranged_duty_array.forEach((doctor_id, x) => {
          if (doctor_id) {
            let y = selectedDoctor.findIndex(
              doctor => doctor.doctor_id == doctor_id
            );
            if (y >= 0) {
              doctorMatrix[y][x].area_abbr = area.area_abbr;
            }
          }
        });
      });
      this.assignDoctor = {};
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
        this.sheetContent.calender.length - 1 &&
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
  cursor: pointer;
}
</style>
