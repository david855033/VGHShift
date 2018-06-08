<template>
    <div>
        <h5>排班區</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>日期</th>
                    <th v-for="(e,i) in calenderByYearMonth(sheetYear,sheetMonth)" :key="i">{{e.date.split('-')[2]}}</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td :colspan="calenderByYearMonth(sheetYear,sheetMonth).length+1">以區排人</td>
                </tr>
                <tr v-for="(area,y) in sheetContent.areaList" :key="y">
                    <td>{{area.description}}</td>
                    <td v-for="(e,x) in calenderByYearMonth(sheetYear,sheetMonth)" :key="x" @click="focus(x,y)">
                        <input type="text" v-show="true" :x="x" :y="y" @keydown.up="onUp" @keydown.down="onDown" @keydown.enter="onDown" @keydown.left="onLeft" @keydown.right="onRight" @focus="focus(x, y)">
                    </td>
                </tr>
                <tr>
                    <td :colspan="calenderByYearMonth(sheetYear,sheetMonth).length+1">以人排區</td>
                </tr>
                <tr v-for="(doctor,y) in sheetContent.doctorList" :key="y+areaListlength">
                    <td>{{doctor.name}}</td>
                    <td v-for="(e,x) in calenderByYearMonth(sheetYear,sheetMonth)" :key="x" @click="focus(x,y+areaListlength)">
                        <input type="text" v-show="true" :x="x" :y="y+areaListlength" @keydown.up="onUp" @keydown.down="onDown" @keydown.enter="onDown" @keydown.left="onLeft" @keydown.right="onRight" @focus="focus(x, y+areaListlength)">
                    </td>
                </tr>
            </tbody>
        </table>

        <div></div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: ["sheetContent", "sheetYear", "sheetMonth"],
  data() {
    return { focus_y: "", focus_x: "" };
  },
  computed: {
    ...mapGetters({
      calenderByYearMonth: "getCalenderByYearMonth"
    }),
    areaListlength: function() {
      return this.sheetContent.areaList.length;
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
      this.focus_y <
        this.sheetContent.doctorList.length +
          this.sheetContent.areaList.length -
          1 && (this.focus_y += 1);
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
td {
  padding: 1px;
}
input[type="text"] {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}
</style>
