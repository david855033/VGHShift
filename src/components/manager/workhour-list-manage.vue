<template>
    <div>
        <h4>Workhour List Manage</h4>
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
                <tr v-for="(e,i) in workhourTable" :key="i">
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
import { mapState } from "vuex";
export default {
  computed: mapState(["workhourTable"])
};
</script>


