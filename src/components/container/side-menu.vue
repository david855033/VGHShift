<template>
    <div id="side-menu-root">
        <div id="user" class="mb-3">
            User
            <div class="ml-3">{{currentUser.user_id}}</div>
            <div class="ml-3">{{currentUser.arrange_section}}</div>
        </div>
        <ul>
            <li>
                <router-link to="/">Main Page</router-link>
            </li>
            <li>Manager</li>
            <ul>
                <li>
                    <router-link to="/doctor-list-manage">doctor list</router-link>
                </li>
                <li>
                    <router-link to="/type-list-manage">type list</router-link>
                </li>
                 <li>
                    <router-link to="/workhour-list-manage">workhour list</router-link>
                </li>
                <li>
                    <router-link to="/calender-manage">calender</router-link>
                </li>
                <li>
                    <router-link to="/sheet-manage">sheet manage</router-link>
                </li>
            </ul>
            <li>Arranger</li>
            <ul>
                <li>
                    <router-link to="/sheet-select">sheet select</router-link>
                </li>
                <ul>
                    <li>
                        <router-link to="/sheet-select/doctor-arrange">doctor</router-link>
                    </li>
                    <li>
                        <router-link to="/sheet-select/type-arrange">type</router-link>
                    </li>
                    <li>
                        <router-link to="/sheet-select/workhour-arrange">workhour</router-link>
                    </li>
                     <li>
                        <router-link to="/sheet-select/area-arrange">area</router-link>
                    </li>
                    <li>
                        <router-link to="/sheet-select/shift-arrange">shift</router-link>
                    </li>
                </ul>
            </ul>
            <li>Employee</li>
            <ul>
                <li>
                    <router-link to="/book-date">book date</router-link>
                </li>
            </ul>
            <li>Querier</li>
            <ul>
                <li>
                    <router-link to="/sheet-query">sheet query</router-link>
                </li>
            </ul>
        </ul>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: mapState(["currentUser"])
};
</script>


<style scoped>
#side-menu-root {
  background-color: rgb(238, 162, 118);
  height: 100%;
}
a {
    color: blue;
}
</style>
