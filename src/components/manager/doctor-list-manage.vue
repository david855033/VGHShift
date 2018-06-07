<template>
    <div>
        <h4>Doctor List Manage</h4>
        <table class="table">
            <thead>
                <tr>
                    <th>doctor_id</th>
                    <th>id</th>
                    <th>name</th>
                    <th>grade</th>
                    <th>section</th>
                    <th>phs</th>
                    <th>code</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(e,i) in doctorTable" :key="i">
                    <td>{{e.doctor_id}}</td>
                    <td>{{e.id}}</td>
                    <td>{{e.name}}</td>
                    <td>{{e.grade}}</td>
                    <td>{{e.section}}</td>
                    <td>{{e.phs}}</td>
                    <td>{{e.code}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["doctorTable"])
};
</script>
