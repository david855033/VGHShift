<template>
    <div>
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
                <tr v-for="(e,i) in workhourByUserSection" :key="i">
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
    workhourByUserSection: "getWorkhourByUserSection"
  }),
  methods: {
    addFromWorkhourList(e) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.workhourList) return;
      let isAlreadyInList = util.inArray(
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
      }
    },
    addAllFromWorkhourList() {
      let vm = this;
      vm.workhourByUserSection.forEach(e => {
        vm.addFromWorkhourList(e);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
h5 {
  margin-top: 10px;
}
</style>

