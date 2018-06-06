<template>
    <div>
        <h4>Type List Manage</h4>
        <table class="table">
            <thead>
                <tr>
                    <th>type_id</th>
                    <th>section</th>
                    <th>description</th>
                    <th>work_to_work</th>
                    <th>work_to_holiday</th>
                    <th>holiday_to_work</th>
                    <th>holiday_to_holiday</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in typeTable" :key="i">
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
import { mapState } from "vuex";
export default {
  computed: mapState(["typeTable"])
};
</script>


