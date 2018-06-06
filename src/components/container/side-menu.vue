<template>
    <div id="root">
        <ul>
            <li><router-link to="/">Main Page</router-link></li>
            <li>Manager</li>
            <ul>
                <li><router-link to="/doctor-list-manage">doctor list</router-link></li>
                <li><router-link to="/type-list-manage">type list</router-link></li>
                <li><router-link to="/calender-manage">calender</router-link></li>
                <li><router-link to="/sheet-manage">sheet manage</router-link></li>
            </ul>
            <li>Arranger</li>
            <ul>
                <li><router-link to="/sheet-select">sheet select</router-link></li>
                <ul>
                    <li><router-link to="/sheet-select/doctor-arrange">doctor</router-link></li>
                    <li><router-link to="/sheet-select/type-arrange">type</router-link></li>
                    <li><router-link to="/sheet-select/workhour-arrange">workhour</router-link></li>
                    <li><router-link to="/sheet-select/shift-arrange">shift</router-link></li>
                </ul>
            </ul>
            <li>Employee</li>
            <ul>
                <li><router-link to="/book-date">book date</router-link></li>
            </ul>
            <li>Querier</li>
            <ul>
                <li><router-link to="/sheet-query">sheet query</router-link></li>
            </ul>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
#root {
  background-color: rgb(238, 162, 118);
}
</style>
