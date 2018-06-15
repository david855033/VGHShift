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
    <h5 class="inline-block">以燈號查詢醫師</h5>
    <div class="inline-block">
      <div class="input-group input-group-sm" id="search-doctor">
        <input type="text" class="form-control" placeholder="燈號" v-model="query_doctor_code">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="getDoctorByCode">查詢</button>
        </div>
      </div>
    </div>

    <table class="table table-sm">
      <thead>
        <tr>
          <th>doctor_id</th>
          <th>name</th>
          <th>grade</th>
          <th>section</th>
          <th>code</th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctor,i) in queryDoctorByCodeResult" :key="i">
          <td>{{doctor.doctor_id}}</td>
          <td>{{doctor.name}}</td>
          <td>{{doctor.grade}}</td>
          <td>{{doctor.section}}</td>
          <td>{{doctor.code}}</td>
          <td>
            <button class="btn btn-sm py-0" @click="addFromDoctorList(doctor)" v-show="!inDoctorList(doctor)">加入</button>
            <div v-show="inDoctorList(doctor)">已加入</div>
          </td>
        </tr>
      </tbody>
    </table>

    <h5>本次排班醫師清單</h5>
    <table class="table table-sm" id="doctor-list-table">
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
          <th>pregnant</th>
          <th>book_dates
            <button type="button" class="btn btn-sm btn-primary py-0" @click="fetchAllBookDate">更新</button>
          </th>
          <th>功能</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(doctor,i) in sheetContent.doctorList" :key="i">
          <td>{{doctor.doctor_id}}</td>
          <td><input class="doctor-abbr" type="text" v-model="doctor.doctor_abbr"></td>
          <td>{{doctor.section}}</td>
          <td><input class="grade" type="text" v-model="doctor.grade"></td>
          <td>{{doctor.name}}</td>
          <td>{{doctor.code}}</td>
          <td><input class="group" type="text" v-model="doctor.group"></td>
          <td>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" :id="'pregnant'+i" v-model="doctor.pregnant">
              <label class="form-check-label" :for="'pregnant'+i">懷孕</label>
            </div>
          </td>
          <td>
            <div>不值班:
              <span v-show="showBookDate_doctor_id!=doctor.doctor_id">{{doctor.book_dates_n}}</span>
            </div>
            <div v-show="showBookDate_doctor_id==doctor.doctor_id" @click.stop>
              <div v-for="(bookDate, j) in bookDateList_MatchDoctor(doctor,'n')" :key='"n"+j'>
                {{bookDate.date}}:{{bookDate.description}}
                <button type='button' class='close' @click='deleteBookDate(doctor,bookDate)'>
                  <span>&times;</span>
                </button>
              </div>
              <addBookDate @add="addBookDate(doctor,'n',$event)"></addBookDate>
            </div>
            <div>想值班:{{doctor.book_dates_y}}</div>
            <div v-show="showBookDate_doctor_id==doctor.doctor_id" @click.stop>
              <div v-for="(bookDate, j) in bookDateList_MatchDoctor(doctor,'y')" :key='"y"+j'>
                {{bookDate.date}}:{{bookDate.description}}
                <button type='button' class='close' @click='deleteBookDate(doctor,bookDate)'>
                  <span>&times;</span>
                </button>
              </div>
              <addBookDate @add="addBookDate(doctor,'y',$event)"></addBookDate>
            </div>
          </td>
          <td>
            <button class="btn btn-sm btn-primary py-0" @click="fetchBookDate(doctor)">更新</button>
            <button class="btn btn-sm btn-primary py-0" @click="()=>{showBookDate_doctor_id=showBookDate_doctor_id==doctor.doctor_id?'':doctor.doctor_id}">編輯</button>
            <button class="btn btn-sm btn-primary py-0" @click="deleteFromDoctorList(doctor)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>
<script>
import { mapGetters } from "vuex";
import util from "@/components/my-util";
import addBookDate from "./doctor-arrange/add-book-date-input-group";

export default {
  components: { addBookDate },
  props: ["sheetContent", "sheetYear", "sheetMonth"],
  data() {
    return {
      query_doctor_code: "",
      queryDoctorByCodeResult: [],
      showBookDate_doctor_id: ""
    };
  },
  computed: {
    ...mapGetters({
      doctorByUserSection: "getDoctorByUserSection",
      doctorByID: "getdoctorByID",
      doctorByCode: "getdoctorByCode",
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
        source_sheetContent.doctorList.forEach(doctor => {
          vm.addFromDoctorList(doctor);
        });
      }
    },
    addFromDoctorList(doctor) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.doctorList) return;

      let doctorFromDataBase = vm.doctorByID(doctor.doctor_id); //確認資料庫內有無此醫師
      if (!doctorFromDataBase) return;

      let isAlreadyInList = _.some(
        sheetContent.doctorList,
        x => x.doctor_id == doctor.doctor_id
      );
      if (!isAlreadyInList) {
        //需載入之上次sheet內doctorList之欄位對應
        let { doctor_id, doctor_abbr, pregnant } = doctor;
        //需從資料庫讀取之欄位
        let { name, grade, section, code } = doctorFromDataBase;
        let newDoctor = {
          doctor_id,
          doctor_abbr,
          name,
          grade,
          section,
          code,
          pregnant
        };
        //note: group及book_dates不載入
        util.fill_DoctorArrange(newDoctor, vm);
        sheetContent.doctorList.push(newDoctor);
        sheetContent.doctorList.sort(
          (a, b) =>
            Number(a.doctor_id.match(/\d+/)[0]) -
            Number(b.doctor_id.match(/\d+/)[0])
        );
        vm.fetchBookDate(newDoctor);
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
    bookDateList_MatchDoctor(doctor, expect) {
      let vm = this;
      let bookDateList = vm.sheetContent.bookDateList;
      return bookDateList.filter(
        x => x.doctor_id == doctor.doctor_id && x.expect == expect
      );
    },
    fetchBookDate(doctor) {
      let vm = this;
      let bookDateList = vm.sheetContent.bookDateList;
      _.remove(bookDateList, x => x.doctor_id == doctor.doctor_id);
      let bookDates = vm.bookDatesByDoctorYearMonth(
        doctor.doctor_id,
        vm.sheetYear,
        vm.sheetMonth
      );
      bookDates.forEach(bookDate => bookDateList.push(bookDate));
      vm.organizeBookDate(doctor);
    },
    fetchAllBookDate() {
      let vm = this;
      let doctorList = vm.sheetContent.doctorList;
      let bookDateList = vm.sheetContent.bookDateList;
      if (!doctorList || !bookDateList) return;
      doctorList.forEach(doctor => vm.fetchBookDate(doctor));
    },
    organizeBookDate(doctor) {
      let vm = this;
      let bookDateList = vm.sheetContent.bookDateList;

      doctor.book_dates_n = "";
      doctor.book_dates_y = "";

      let bookDateList_matchDoctor = bookDateList.filter(
        x => x.doctor_id == doctor.doctor_id
      );
      bookDateList_matchDoctor.forEach(bookDate => {
        if (doctor) {
          if (bookDate.expect == "n") {
            doctor.book_dates_n += bookDate.date + ",";
          } else if (bookDate.expect == "y")
            doctor.book_dates_y += bookDate.date + ",";
        }
      });
      doctor.book_dates_n = _.trimEnd(doctor.book_dates_n, ",");
      doctor.book_dates_y = _.trimEnd(doctor.book_dates_y, ",");
    },
    deleteBookDate(doctor, bookDate) {
      let vm = this;
      let bookDateList = vm.sheetContent.bookDateList;
      let index = bookDateList.findIndex(
        x =>
          x.doctor_id == bookDate.doctor_id &&
          x.expect == bookDate.expect &&
          x.date == bookDate.date
      );
      bookDateList.splice(index, 1);
      vm.organizeBookDate(doctor);
    },
    addBookDate(doctor, expect, event) {
      let vm = this;
      let bookDateList = vm.sheetContent.bookDateList;
      let calender = vm.sheetContent.calender;
      let { date, description } = event;
      let maxDate = _.maxBy(calender, "date").date.split("-")[2];
      if (date <= maxDate) {
        let duplicate_bookDate = bookDateList.find(x => x.date == date);
        if (duplicate_bookDate) {
          vm.deleteBookDate(doctor, duplicate_bookDate);
        }
        let newBookDate = {
          doctor_id: doctor.doctor_id,
          year: vm.sheetYear,
          month: vm.sheetMonth,
          date,
          expect,
          description
        };
        bookDateList.push(newBookDate);
        bookDateList.sort((a, b) => a.date - b.date);
        vm.organizeBookDate(doctor);
      }
    },
    getDoctorByCode() {
      let vm = this;
      if (vm.query_doctor_code) {
        vm.queryDoctorByCodeResult = vm.doctorByCode(vm.query_doctor_code);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/common.scss";
h5 {
  margin-top: 10px;
}
#search-doctor {
  width: 200px;
}
#doctor-list-table input[type="text"] {
  height: 25px;
  text-align: center;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
input.doctor-abbr {
  width: 25px;
}
input.grade {
  width: 60px;
}
input.group {
  width: 40px;
}
</style>


