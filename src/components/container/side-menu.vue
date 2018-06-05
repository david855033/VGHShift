<template>
    <div id="root">
        <ul>
            <li><router-link to="/">Main Page</router-link></li>
            <li>Manager</li>
            <ul>
                <li><router-link to="doctor-list-manage"> doctor list</router-link></li>
                <li>type list</li>
                <li>calender</li>
                <li>sheet manage</li>
            </ul>
            <li>Arranger</li>
            <ul>
                <li>sheet selector</li>
                <ul>
                    <li>doctor</li>
                    <li>type</li>
                    <li>workhour</li>
                    <li>shift</li>
                </ul>
            </ul>
            <li>Doctor</li>
            <ul>
                <li>request date</li>
            </ul>
            <li>Querier</li>
            <ul>
                <li>sheet query</li>
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
