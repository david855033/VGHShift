<template>
    <div>
        <h4>Book Date</h4>
        <table class="table">
            <thead>
                <tr>
                    <th>doctor_id</th>
                    <th>year</th>
                    <th>month</th>
                    <th>date</th>
                    <th>expect</th>
                    <th>description</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in bookDate" :key="i">
                    <td>{{e.doctor_id}}</td>
                    <td>{{e.year}}</td>
                    <td>{{e.month}}</td>
                    <td>{{e.date}}</td>
                    <td>{{e.expect}}</td>
                    <td>{{e.description}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["bookDate"])
};
</script>