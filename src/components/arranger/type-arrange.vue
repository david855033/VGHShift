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
                        <button class="btn btn-sm btn-primary" @click='onLoadTypeListFromSheet(sheet)'>load</button>
                    </td>
                </tr>
            </tbody>
        </table>
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
                <tr v-for="(e,i) in typeByUserSection" :key="i" v-show="!inTypeList(e)">
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
                    <th>功能</th>
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
                    <td>
                        <button class="btn btn-sm btn-primary" @click="deleteFromTypeList(e)">刪除</button>
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
    typeByUserSection: "getTypeByUserSection",
    lastPublishedSheetByUserSection: "getLastPublishedSheetByUserSection"
  }),
  methods: {
    onLoadTypeListFromSheet(sheet) {
      let vm = this;
      if (!sheet.content) {
        return;
      }
      let source_sheetContent = JSON.parse(sheet.content);
      if (source_sheetContent.typeList) {
        source_sheetContent.typeList.forEach(type =>
          vm.addFromTypeList(type)
        );
      }
    },
    addFromTypeList(e) {
      let vm = this;
      let sheetContent = vm.sheetContent;
      if (!sheetContent.typeList) return;
      let isAlreadyInList = _.some(
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
        sheetContent.typeList.sort(
          (a, b) =>
            Number(a.type_id.match(/\d+/)[0]) -
            Number(b.type_id.match(/\d+/)[0])
        );
      }
    },
    addAllFromTypeList() {
      let vm = this;
      vm.typeByUserSection.forEach(e => {
        vm.addFromTypeList(e);
      });
    },
    inTypeList(type) {
      let vm = this;
      return _.some(vm.sheetContent.typeList, x => x.type_id == type.type_id);
    },
    deleteFromTypeList(type) {
      let typeList = this.sheetContent.typeList;
      if (typeList) {
        let index = typeList.findIndex(x => x.type_id == type.type_id);
        typeList.splice(index, 1);
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


