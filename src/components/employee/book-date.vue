<template>
    <div>
        <h4>Book Date</h4>
        <table class="table">
            <thead>
                <tr>
                    <th>doctor_id</th>
                    <th>year</th>
                    <th>month</th>
                    <th>book_dates (date, expect, description)</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in bookDate" :key="i">
                    <td>{{e.doctor_id}}</td>
                    <td>{{e.year}}</td>
                    <td>{{e.month}}</td>
                    <td>
                        <div v-for="(book,i) in JSON.parse(e.book_dates)" :key="i">{{book.date}},{{book.expect}},{{book.description}}</div>
                    </td>
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