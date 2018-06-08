<template>
    <div>
        <h5>從預設醫師清單載入 (doctorList filtered by user arrange_section)</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>doctor_id</th>
                    <th>name</th>
                    <th>grade</th>
                    <th>section</th>
                    <th>code</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in doctorByUserSection" :key="i">
                    <td>{{e.doctor_id}}</td>
                    <td>{{e.name}}</td>
                    <td>{{e.grade}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.code}}</td>
                    <td>
                        <button class="btn btn-sm py-0" @click="addFromDoctorList(e)">加入</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h5>從先前班表載入</h5>
        /*todo 顯示出最近兩個月班表，提供載入功能*/
        <h5>本次排班醫師清單</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>doctor_id</th>
                    <th>section</th>
                    <th>grade</th>
                    <th>name</th>
                    <th>code</th>
                    <th>group</th>
                    <th>book_dates</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in sheetContent.doctorList" :key="i">
                    <td>{{e.doctor_id}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.grade}}</td>
                    <td>{{e.name}}</td>
                    <td>{{e.code}}</td>
                    <td>{{e.group}}</td>
                    <td>
                        <div v-for="(book, i) in JSON.parse(e.book_dates)" :key="i"> {{book.date}},{{book.expect}},{{book.description}}
                        </div>
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
  props: ["sheetContent","sheetYear","sheetMonth"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      doctorByUserSection: "getDoctorByUserSection",
      bookDatesByDoctorYearMonth: "getBookDatesByDoctorYearMonth"
    })
  },
  methods: {
    addFromDoctorList(e) {
      let vm = this;
      let sheetContent = vm.sheetContent;
       if(!sheetContent.doctorList) return;
      let isAlreadyInList = util.inArray(
        sheetContent.doctorList,
        x => x.doctor_id == e.doctor_id
      );
      if (!isAlreadyInList) {
        let { doctor_id, name, grade, section, code } = e;
        util.fill_DoctorArrange(e, vm);
        sheetContent.doctorList.push(e);
      }
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
</style>


