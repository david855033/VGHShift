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
          <tr>
            <th colspan="2"></th>
            <th v-for="(e,i) in sheetContent.calender" :key="i" :class='{"holiday":e.is_holiday}'>{{weekDay(e.date)}}</th>
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
            <td class="col-description" :class="{selected:area==assignArea}" @click="setAssignArea(area)">{{area.description}}</td>
            <td class="col-abbr" @click="setAssignArea(area)">{{area.area_abbr}}</td>
            <td class="cell" v-for="(e,x) in sheetContent.calender" :class="((areaMatrix[y]||[])[x]||{}).class" :key="x" @click="focus(x,y)">
              <div>
                <input type="text" v-show="true" :x="x" :y="y" @keydown.prevent="onAnyKey($event, e,'area', area)" @focus="focus(x, y)" :value="((areaMatrix[y]||[])[x]||{}).doctor_abbr" @input="onAreaInput($event,y,x)" @click="onAreaCellClick(area,x)">
                <span :class="((((areaMatrix[y]||[])[x]||{}).message)||{}).class" v-if="(((areaMatrix[y]||[])[x]||{}).message||{}).text">
                  {{(((areaMatrix[y]||[])[x]||{}).message||{}).text}}
                </span>
              </div>
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
            <td class="col-description" :class="{selected:doctor==assignDoctor}" @click="setAssignDoctor(doctor)">{{doctor.name}}</td>
            <td class="col-abbr" @click="setAssignDoctor(doctor)">{{doctor.doctor_abbr}}</td>
            <td class="cell" v-for="(e,x) in sheetContent.calender" :key="x" :class="((doctorMatrix[y]||[])[x]||{}).class" @click="focus(x,y+selectedArea.length)">
              <div>
                <input type="text" v-show="true" :x="x" :y="y+selectedArea.length" :value="((doctorMatrix[y]||[])[x]||{}).area_abbr" @keydown.prevent="onAnyKey($event,e,'doctor' ,doctor)" @focus="focus(x, y+selectedArea.length)" @input="onDoctorInput($event,y,x)" @click="onDoctorCellClick(doctor,x)">
                <span :class="((((doctorMatrix[y]||[])[x]||{}).message)||{}).class" v-if="(((doctorMatrix[y]||[])[x]||{}).message||{}).text">
                  {{(((doctorMatrix[y]||[])[x]||{}).message||{}).text}}
                </span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import shiftChecker from "./shift-checker";
import util from "@/components/my-util";
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
      // if (vm.checkedDoctor.length == 0) {
      //   return vm.sheetContent.doctorList;
      // } else {
      return vm.sheetContent.doctorList.filter(
        x => vm.checkedDoctor.indexOf(x.grade) >= 0
      );
      // }
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
    weekDay(date) {
      return util.dayToWeekDay(new Date(date).getDay());
    },
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
        } else if (e.code == "ArrowRight" || e.code == "Tab") {
          vm.onRight();
        } else if (e.code == "Backspace" || e.code == "Delete") {
          let isCellEmpty = true;
          if (updateType == "doctor") {
            //delete in doctor cell
            let doctor = rowElement;
            let y = selectedDoctor.findIndex(
              x => x.doctor_abbr == doctor.doctor_abbr
            );
            let area_abbr = doctorMatrix[y][date - 1].area_abbr;
            let matchArea = areaList.filter(
              x => area_abbr.indexOf(x.area_abbr) !== -1
            );
            matchArea.forEach(area => {
              vm.arrange_ViewMatrix(area, date, doctor, true);
              vm.arrange_AreaList(area, date, doctor, true);
            });
          } else if (updateType == "area") {
            //delete in area cell
            let area = rowElement;
            let y = selectedArea.findIndex(
              x => x.area_abbr.indexOf(area.area_abbr) !== -1
            );
            let doctor_abbr = areaMatrix[y][date - 1].doctor_abbr;
            let split = _.trim(doctor_abbr, "/").split("/");
            doctor_abbr = split[split.length - 1];
            let matchDoctor = doctorList.filter(
              x => x.doctor_abbr == doctor_abbr
            );
            matchDoctor.forEach(doctor => {
              vm.arrange_ViewMatrix(area, date, doctor, true);
              vm.arrange_AreaList(area, date, doctor, true);
            });
            isCellEmpty = areaMatrix[y][date - 1].doctor_abbr == "";
          }
          if (isCellEmpty) {
            if (e.code == "Backspace") {
              vm.onLeft();
            } else {
              vm.onRight();
            }
          }
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
    //改變Matrix內容
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
        areaMatrix.forEach(row => {
          if (row[x].doctor_abbr.indexOf(doctor.doctor_abbr) !== -1) {
            if (row[x].doctor_abbr.indexOf("/") !== -1) {
              //原本為'A/B'格式
              let splittedCell = row[x].doctor_abbr.split("/");
              if (splittedCell[0] == doctor.doctor_abbr) {
                //移除A:'A/B'改為B
                row[x].doctor_abbr = splittedCell[1];
              } else if (splittedCell[1] == doctor.doctor_abbr) {
                //移除B:'A/B'改為A/
                row[x].doctor_abbr = splittedCell[0] + "/";
              }
            } else {
              row[x].doctor_abbr = "";
            }
          }
        });
        //remove same area in doctorMatraix
        let scan_area_abbr =
          area.area_abbr + (doctor.pregnant && area.pregnant_cover ? "*" : "");
        doctorMatrix.forEach(row => {
          if (row[x].area_abbr == scan_area_abbr) {
            row[x].area_abbr = "";
          }
        });
      }
      //rendering matched cell in areaMatrix
      if (area.pregnant_cover) {
        let current_cell_is_pregnant =
          areaMatrix[y_area][x].doctor_abbr.indexOf("/") !== -1;
        let splittedCell = areaMatrix[y_area][x].doctor_abbr.split("/");
        let replace_abbr, clear_abbr;
        if (doctor.pregnant) {
          if (current_cell_is_pregnant) {
            replace_abbr = doctor.doctor_abbr + "/" + (splittedCell[1] || "");
            clear_abbr = splittedCell[1] || "";
          } else {
            replace_abbr = doctor.doctor_abbr + "/" + (splittedCell[0] || "");
            clear_abbr = "";
          }
        } else {
          if (current_cell_is_pregnant) {
            replace_abbr = (splittedCell[0] || "") + "/" + doctor.doctor_abbr;
            clear_abbr = (splittedCell[0] || "") + "/";
          } else {
            replace_abbr = doctor.doctor_abbr;
            clear_abbr = "";
          }
        }
        areaMatrix[y_area][x].doctor_abbr = clear ? clear_abbr : replace_abbr;
      } else {
        areaMatrix[y_area][x].doctor_abbr = clear ? "" : doctor.doctor_abbr;
      }
      //rendering matched cell in doctorMatrix
      doctorMatrix[y_doctor][x].area_abbr = clear
        ? ""
        : area.area_abbr + (doctor.pregnant && area.pregnant_cover ? "*" : "");
    },
    //改變AreaList內容
    arrange_AreaList(area, date, doctor, clear) {
      let areaList = this.sheetContent.areaList;
      let x = date - 1;
      //remove duplicate in same day(清除時不論是否pregnant)
      if (!clear) {
        areaList.forEach(row => {
          //展開
          let duty_array = JSON.parse(row.arranged_duty);
          let duty_pregnent_array = JSON.parse(row.arranged_duty_pregnant);
          //若當天有重複的人則清空
          if (duty_array[x] == doctor.doctor_id) {
            duty_array[x] = "";
          }
          if (duty_pregnent_array[x] == doctor.doctor_id) {
            duty_pregnent_array[x] = "";
          }
          //寫入
          row.arranged_duty = JSON.stringify(duty_array);
          row.arranged_duty_pregnant = JSON.stringify(duty_pregnent_array);
        });
      }
      //set new value 設定時doctor.pregnant 及 area.pregnant_cover皆為true，則設定arranged_duty_pregnant
      if (doctor.pregnant && area.pregnant_cover) {
        //設定懷孕值班
        let array = JSON.parse(area.arranged_duty_pregnant);
        array[x] = clear ? "" : doctor.doctor_id;
        area.arranged_duty_pregnant = JSON.stringify(array);
      } else {
        //設定普通值班
        let array = JSON.parse(area.arranged_duty);
        array[x] = clear ? "" : doctor.doctor_id;
        area.arranged_duty = JSON.stringify(array);
      }
      shiftChecker.check(this, { area, date, doctor });
    },
    renderAreaMatrix() {
      //TODO: area is pregnant cover
      // -> render arranged_duty_pregnant as 'A/B'
      let vm = this;
      let doctorList = vm.sheetContent.doctorList;
      let areaList = vm.sheetContent.areaList;
      let selectedArea = vm.selectedArea;
      let areaMatrix = vm.areaMatrix;
      selectedArea.forEach((area, y) => {
        vm.$set(areaMatrix, y, []);
        let arranged_duty_array = JSON.parse(area.arranged_duty) || [];
        let arranged_duty_pregnant_array =
          JSON.parse(area.arranged_duty_pregnant) || [];
        let areaList_y = areaList.findIndex(x => x.area_id == area.area_id);
        vm.sheetContent.calender.forEach((d, x) => {
          //取得duty之abbr
          let doctor_id = arranged_duty_array[x];
          let doctor_abbr =
            (doctorList.find(x => x.doctor_id == doctor_id) || {})
              .doctor_abbr || "";
          //取得pregnant_duty之abbr (若pregnant_cover為真)
          let doctor_abbr_pregnant = "";
          if (area.pregnant_cover) {
            let doctor_id_pregnant = arranged_duty_pregnant_array[x];
            let doctor_pregnant =
              doctorList.find(x => x.doctor_id == doctor_id_pregnant) || {};
            if (doctor_pregnant.pregnant) {
              doctor_abbr_pregnant = doctor_pregnant.doctor_abbr || "";
              if (doctor_abbr_pregnant) {
                //如果abbr有值，增加"/"於結尾
                doctor_abbr_pregnant = doctor_abbr_pregnant + "/";
              }
            }
          }
          let set_doctor_abbr = doctor_abbr_pregnant + doctor_abbr;
          vm.$set(areaMatrix[y], x, {
            doctor_abbr: set_doctor_abbr,
            class: [],
            message: []
          }); //areaMatrix初始值
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
          //doctorMatrix初始值
          vm.$set(doctorMatrix[y], x, {
            area_abbr: "",
            class: []
          });
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
        //顯示arranged_duty_pregnant
        if (area.pregnant_cover) {
          let arranged_duty_pregnant_array =
            JSON.parse(area.arranged_duty_pregnant) || [];
          arranged_duty_pregnant_array.forEach((doctor_id, x) => {
            if (doctor_id) {
              let y = selectedDoctor.findIndex(
                doctor => doctor.doctor_id == doctor_id
              );
              if (y >= 0 && area.area_abbr) {
                doctorMatrix[y][x].area_abbr = area.area_abbr + "*";
              }
            }
          });
        }
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
      this.focus_x < this.sheetContent.calender.length - 1 &&
        (this.focus_x += 1);
      this.resetfocus();
    }
  },
  mounted() {
    this.renderAreaMatrix();
    this.renderDoctorMatrix();
    shiftChecker.check(this);
  },
  watch: {
    checkedArea: {
      handler() {
        this.renderAreaMatrix();
        shiftChecker.check(this);
      },
      deep: true
    },
    checkedDoctor: {
      handler() {
        this.renderDoctorMatrix();
        shiftChecker.check(this);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped >
@import "./shift-arrange.scss";
table {
  max-width: 1250px;
  margin: auto;
  border-collapse: collapse;
  border-spacing: 0px;
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
  font-size: 0.9em;
  &.holiday {
    color: hsl(0, 60, 40);
  }
}

$color-hover: hsl(40, 90, 95);
$color-select: hsl(40, 90, 90);
td {
  vertical-align: middle;
  &.col-description {
    cursor: pointer;
    &:hover {
      background-color: $color-hover;
    }
    &.selected {
      background-color: $color-select;
    }
  }
  &.col-abbr {
    cursor: pointer;
    width: 40px;
    background: whitesmoke;
    text-align: center;
  }
  &.cell {
    width: 30px;
    min-width: 35px;
    border: 1px solid hsl(0, 0, 90);
    input {
      border: 0px;
      background-color: transparent;
    }
  }
}
input[type="text"] {
  width: 35px;
  height: 30px;
  text-align: center;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  cursor: pointer;
}
</style>
