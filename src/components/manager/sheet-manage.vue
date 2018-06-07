<template>
    <div>
        <h4>Sheet Manage</h4>
        <table class="table">
            <thead>
                <tr>
                    <th>sheet_id</th>
                    <th>year</th>
                    <th>month</th>
                    <th>section</th>
                    <th>version</th>
                    <th>status</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in sheetTable" :key="i">
                    <td>{{e.sheet_id}}</td>
                    <td>{{e.year}}</td>
                    <td>{{e.month}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.version}}</td>
                    <td>{{e.status}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["sheetTable"])
};
</script>


