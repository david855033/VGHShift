let fillWithReactivity = function (object, vm, keyList, arrayList) {
    keyList.forEach(e => {
        if (!(e in object)) {
            vm.$set(object, e, "");
        }
    })
    arrayList.forEach(e => {
        if (!(e in object)) {
            vm.$set(object, e, "[]");
        }
    })
}

export default {
    fill_DoctorArrange: function (doctor, vm) {
        let keyList = ["doctor_id", "doctor_abbr", "name", "grade", "section", "code", "group", "pregnant", "book_dates_n", "book_dates_y"];
        let arrayList = [];
        fillWithReactivity(doctor, vm, keyList, arrayList)
    },
    fill_TypeArrange: function (type, vm) {
        let keyList = ["type_id", "section", "description", "work_to_work", "work_to_holiday", "holiday_to_work", "holiday_to_holiday"];
        let arrayList = [];
        fillWithReactivity(type, vm, keyList, arrayList)
    },
    fill_WorkhourArrange: function (workhour, vm) {
        let keyList = ["type_id", "section", "description", "start_work", "end_work", "nap", "pm_off"];
        let arrayList = [];
        fillWithReactivity(workhour, vm, keyList, arrayList)
    },
    fill_AreaArrange: function (area, vm) {
        let keyList = ["area_id", "type_id", "workhour_id", "area_abbr", "description", "pregnant_cover"];
        let arrayList = ["available_grades", "arranged_duty", "arranged_duty_pregnant"];
        fillWithReactivity(area, vm, keyList, arrayList)
    },
    default_abbr: function () {
        let output = [];
        var start1 = "A".charCodeAt(0);
        var start2 = "a".charCodeAt(0);
        for (var i = 0; i < 26; i++) {
            output.push(String.fromCharCode(start1 + i))
        }
        for (var i = 0; i < 26; i++) {
            output.push(String.fromCharCode(start2 + i))
        }
        return output;
    },
    dayToWeekDay(day){
        if(day==0){
            return "日"
        }else if(day==1){
            return "一"
        }else if(day==2){
            return "二"
        }else if(day==3){
            return "三"
        }else if(day==4){
            return "四"
        }else if(day==5){
            return "五"
        }else if(day==6){
            return "六"
        }else if(day==7){
            return "日"
        }
        return "";
    }
}