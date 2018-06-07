export default {
    inArray: function (array, predicate) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
            if (predicate(array[i])) return true;
        }
        return false;
    },
    fill_DoctorArrange: function (doctor,vm) {
        let keyList = ["doctor_id", "name", "grade", "section", "code", "group"];
        keyList.forEach(e => {
            if (!(e in doctor)) {
                vm.$set(doctor,e, "");
            }
        })

        let arrayList = ["book_dates"];
        arrayList.forEach(e => {
            if (!(e in doctor)) {
                vm.$set(doctor,e, "[]");
            }
        })
    }
}