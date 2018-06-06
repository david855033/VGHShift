<template>
    <div>
        <h4>Calender Manage</h4>
        <table class="table">
            <thead>
                <tr>
                    <th>date</th>
                    <th>weekday</th>
                    <th>is_holiday</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in calenderTable" :key="i">
                    <td>{{e.date}}</td>
                    <td>{{e.weekday}}</td>
                    <td>{{e.is_holiday}}</td>
                    <td>{{e.description}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["calenderTable"])
};
</script>


