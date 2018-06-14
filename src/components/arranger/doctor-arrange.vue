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
            <button class="btn btn-sm btn-primary" @click='onLoadDoctorListFromSheet(sheet)'>load</button>
          </td>
        </tr>
      </tbody>
    </table>
    <h5>從預設醫師清單載入 (doctorList filtered by user arrange_section)</h5>
    <table class="table table-sm">
      <thead>
        <tr>
          <th>doctor_id</th>
          <th>name</th>
          <th>grade</th>
          <th>section</th>
          <th>code</th>
          <th>
            <button class="btn btn-sm py-0" @click="addAllFromDoctorList()">全部加入</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctor,i) in doctorByUserSection" :key="i" v-show="!inDoctorList(doctor)">
          <td>{{doctor.doctor_id}}</td>
          <td>{{doctor.name}}</td>
          <td>{{doctor.grade}}</td>
          <td>{{doctor.section}}</td>
          <td>{{doctor.code}}</td>
          <td>
            <button class="btn btn-sm py-0" @click="addFromDoctorList(doctor)">加入</button>
          </td>
        </tr>
      </tbody>
    </table>

    <h5>本次排班醫師清單</h5>
    <table class="table table-sm">
      <thead>
        <tr>
          <th>doctor_id</th>
          <th>doctor_abbr
            <button type="button" class="btn btn-small ml-1 p-0" @click="auto_abbr">自動</button>
          </th>
          <th>section</th>
          <th>grade</th>
          <th>name</th>
          <th>code</th>
          <th>group</th>
          <th>book_dates</th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctor,i) in sheetContent.doctorList" :key="i">
          <td>{{doctor.doctor_id}}</td>
          <td><input type="text" v-model="doctor.doctor_abbr"></td>
          <td>{{doctor.section}}</td>
          <td>{{doctor.grade}}</td>
          <td>{{doctor.name}}</td>
          <td>{{doctor.code}}</td>
          <td>{{doctor.group}}</td>
          <td>
            <div v-for="(book, i) in JSON.parse(doctor.book_dates)" :key="i"> {{book.date}},{{book.expect}},{{book.description}}
            </div>
          </td>
          <td>
            <button class="btn btn-sm btn-primary" @click="deleteFromDoctorList(doctor)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-sm btn-primary" @click="fetchBookDate">更新bookdate</button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import util from "@/components/my-util";

export default {
  props: ["sheetContent", "sheetYear", "sheetMonth"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      doctorByUserSection: "getDoctorByUserSection",
      lastPublishedSheetByUserSection: "getLastPublishedSheetByUserSection",
      bookDatesByDoctorYearMonth: "getBookDatesByDoctorYearMonth"
    })
  },
  methods: {
    onLoadDoctorListFromSheet(sheet) {
      let vm = this;
      if (!sheet.content) {
        return;
      }
      let source_sheetContent = JSON.parse(sheet.content);
      if (source_sheetContent.doctorList) {
        source_sheetContent.doctorList.forEach(doctor =>
          vm.addFromDoctorList(doctor)
        );
      }
    },
    addFromDoctorList(doctor) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.doctorList) return;
      let isAlreadyInList = _.some(
        sheetContent.doctorList,
        x => x.doctor_id == doctor.doctor_id
      );
      if (!isAlreadyInList) {
        let { doctor_id, name, grade, section, code } = doctor; //doctor之欄位對應
        util.fill_DoctorArrange(doctor, vm);
        sheetContent.doctorList.push(doctor);
        sheetContent.doctorList.sort(
          (a, b) =>
            Number(a.doctor_id.match(/\d+/)[0]) -
            Number(b.doctor_id.match(/\d+/)[0])
        );
      }
    },
    addAllFromDoctorList() {
      let vm = this;
      vm.doctorByUserSection.forEach(e => {
        vm.addFromDoctorList(e);
      });
    },
    inDoctorList(doctor) {
      let vm = this;
      return _.some(
        vm.sheetContent.doctorList,
        x => x.doctor_id == doctor.doctor_id
      );
    },
    deleteFromDoctorList(doctor) {
      let doctorList = this.sheetContent.doctorList;
      if (doctorList) {
        let index = doctorList.findIndex(x => x.doctor_id == doctor.doctor_id);
        doctorList.splice(index, 1);
      }
    },
    auto_abbr() {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.doctorList) return;
      let default_abbr = util.default_abbr();
      let position = 0;
      vm.sheetContent.doctorList.forEach(doctor => {
        if (position < default_abbr.length) {
          doctor.doctor_abbr = default_abbr[position];
          position++;
        }
      });
    },
    fetchBookDate() {
      let vm = this;
      let doctorList = vm.sheetContent.doctorList;
      if (!doctorList) return;
      for (var i = 0; i < doctorList.length; i++) {
        let bookDates = vm.bookDatesByDoctorYearMonth(
          doctorList[i].doctor_id,
          vm.sheetYear,
          vm.sheetMonth
        );
        doctorList[i].book_dates = bookDates;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
h5 {
  margin-top: 10px;
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


