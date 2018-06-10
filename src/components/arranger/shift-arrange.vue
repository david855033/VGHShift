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
              <input type="text" v-show="true" :x="x" :y="y" @keydown.prevent="onAnyKey($event, e,'area', area)" @focus="focus(x, y)" :value="getArrangedDutyInArea(area, e)">
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
              <input type="text" v-show="true" :x="x" :y="y+selectedArea.length" @keydown.prevent="onAnyKey($event,e,'doctor' ,doctor)" @focus="focus(x, y+selectedArea.length)">
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
     getArrangedDutyInArea(area, date) {
      // let vm = this;
      // let doctorList = vm.sheetContent.doctorList;
      // let areaList = vm.sheetContent.areaList;
      return 1;
    },
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
    onAnyKey(e, dateElement, updateType, rowElement) {
      let vm = this;
      if (!e.shiftKey && !e.ctrlKey) {
        if (e.code == "ArrowDown") {
          vm.onDown();
        } else if (e.code == "ArrowUp") {
          vm.onUp();
        } else if (e.code == "ArrowLeft") {
          vm.onLeft();
        } else if (e.code == "Backspace" || e.code == "Delete") {
          e.path[0].value = "";
          vm.onLeft();
        } else if (e.code == "ArrowRight" || e.code == "Tab") {
          vm.onRight();
        }
      }
      if (e.key.length == 1 && !e.ctrlKey) {
        let charCode = e.key.charCodeAt(0);
        if (
          (charCode >= 65 && charCode <= 90) ||
          (charCode >= 97 && e.keyCode <= 122) ||
          (charCode >= 48 && e.keyCode <= 57)
        ) {
          let value = String.fromCharCode(charCode); // TODO: make a function to recieve duty arrange.
          let date = new Date(dateElement.date).getDate();
          if (updateType == "doctor") {
            let doctor_id = rowElement.doctor_id;
            console.log(
              "update:" + updateType + ", value:" + value + ", date:" + date,
              ", doctor_id:" + doctor_id
            );
          }

          vm.onRight();
        }
      }
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
