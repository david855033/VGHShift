export default {
    inArray: function (array, predicate) {
        var length = array.length;
        for (var i = 0; i < length; i++) {
            if (predicate(array[i])) return true;
        }
        return false;
    },
    fill_DoctorArrange: function (doctor, vm) {
        let keyList = ["doctor_id", "name", "grade", "section", "code", "group"];
        keyList.forEach(e => {
            if (!(e in doctor)) {
                vm.$set(doctor, e, "");
            }
        })

        let arrayList = ["book_dates"];
        arrayList.forEach(e => {
            if (!(e in doctor)) {
                vm.$set(doctor, e, "[]");
            }
        })
    },
    fill_TypeArrange: function (type, vm) {
        let keyList = ["type_id", "section", "description", "work_to_work", "work_to_holiday", "holiday_to_work", "holiday_to_holiday"];
        keyList.forEach(e => {
            if (!(e in type)) {
                vm.$set(type, e, "");
            }
        })

        let arrayList = [];
        arrayList.forEach(e => {
            if (!(e in type)) {
                vm.$set(type, e, "[]");
            }
        })
    }
}