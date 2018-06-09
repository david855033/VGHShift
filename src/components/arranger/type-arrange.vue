<template>
    <div>
        <h5>從預設班型清單載入 (type filtered by user arrange_section)</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>type_id</th>
                    <th>section</th>
                    <th>description</th>
                    <th>平平</th>
                    <th>平假</th>
                    <th>假平</th>
                    <th>假假</th>
                    <th>
                        <button class="btn btn-sm py-0" @click="addAllFromTypeList()">全部加入</button>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in typeByUserSection" :key="i">
                    <td>{{e.type_id}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.description}}</td>
                    <td>{{e.work_to_work}}</td>
                    <td>{{e.work_to_holiday}}</td>
                    <td>{{e.holiday_to_work}}</td>
                    <td>{{e.holiday_to_holiday}}</td>
                    <td>
                        <button type="button" class="btn btn-sm py-0" @click="addFromTypeList(e)">加入</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <h5>本班表所使用班型</h5>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th>type_id</th>
                    <th>section</th>
                    <th>description</th>
                    <th>平平</th>
                    <th>平假</th>
                    <th>假平</th>
                    <th>假假</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in sheetContent.typeList" :key="i">
                    <td>{{e.type_id}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.description}}</td>
                    <td>{{e.work_to_work}}</td>
                    <td>{{e.work_to_holiday}}</td>
                    <td>{{e.holiday_to_work}}</td>
                    <td>{{e.holiday_to_holiday}}</td>
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
    typeByUserSection: "getTypeByUserSection"
  }),
  methods: {
    addFromTypeList(e) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.typeList) return;
      let isAlreadyInList = util.inArray(
        sheetContent.typeList,
        x => x.type_id == e.type_id
      );
      if (!isAlreadyInList) {
        let {
          type_id,
          section,
          description,
          work_to_work,
          work_to_holiday,
          holiday_to_work,
          holiday_to_holiday
        } = e;
        util.fill_TypeArrange(e, vm);
        sheetContent.typeList.push(e);
      }
    },
    addAllFromTypeList() {
      let vm = this;
      vm.typeByUserSection.forEach(e => {
        vm.addFromTypeList(e);
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


