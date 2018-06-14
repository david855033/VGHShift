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
                        <button class="btn btn-sm btn-primary" @click='onLoadWorkhourListFromSheet(sheet)'>load</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h5>從預設上班日工時清單載入 (workhour filtered by user arrange_section)</h5>
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
                    <th>
                        <button class="btn btn-sm py-0" @click="addAllFromWorkhourList()">全部加入</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in workhourByUserSection" :key="i" v-show="!inWorkhourList(e)">
                    <td>{{e.workhour_id}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.description}}</td>
                    <td>{{e.start_work}}</td>
                    <td>{{e.end_work}}</td>
                    <td>{{e.nap}}</td>
                    <td>{{e.pm_off}}</td>
                    <td>
                        <button type="button" class="btn btn-sm py-0" @click="addFromWorkhourList(e)">加入</button>
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
                    <th>功能</th>
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
                    <td>
                        <button class="btn btn-sm btn-primary" @click="deleteFromWorkhourList(e)">刪除</button>
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
  computed: mapGetters({
    workhourByUserSection: "getWorkhourByUserSection",
    lastPublishedSheetByUserSection: "getLastPublishedSheetByUserSection"
  }),
  methods: {
    onLoadWorkhourListFromSheet(sheet) {
      let vm = this;
      if (!sheet.content) {
        return;
      }
      let source_sheetContent = JSON.parse(sheet.content);
      if (source_sheetContent.workhourList) {
        source_sheetContent.workhourList.forEach(workhour =>
          vm.addFromWorkhourList(workhour)
        );
      }
    },
    addFromWorkhourList(e) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.workhourList) return;
      let isAlreadyInList = _.some(
        sheetContent.workhourList,
        x => x.workhour_id == e.workhour_id
      );
      if (!isAlreadyInList) {
        let {
          workhour_id,
          section,
          description,
          start_work,
          end_work,
          nap,
          pm_off
        } = e;
        util.fill_WorkhourArrange(e, vm);
        sheetContent.workhourList.push(e);
        sheetContent.workhourList.sort(
          (a, b) =>
            Number(a.workhour_id.match(/\d+/)[0]) -
            Number(b.workhour_id.match(/\d+/)[0])
        );
      }
    },
    addAllFromWorkhourList() {
      let vm = this;
      vm.workhourByUserSection.forEach(e => {
        vm.addFromWorkhourList(e);
      });
    },
    inWorkhourList(workhour) {
      let vm = this;
      return _.some(
        vm.sheetContent.workhourList,
        x => x.workhour_id == workhour.workhour_id
      );
    },
    deleteFromWorkhourList(workhour) {
      let workhourList = this.sheetContent.workhourList;
      if (workhourList) {
        let index = workhourList.findIndex(
          x => x.workhour_id == workhour.workhour_id
        );
        workhourList.splice(index, 1);
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

