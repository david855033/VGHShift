export default {
    check(vm, changed) {
        this.holiday.check(vm, changed)
        console.log('checking: changed=', changed)
    },
    holiday: {
        description: "holiday",
        check(vm) {
            let { areaList, doctorList, calender } = vm.sheetContent
            let { selectedArea, areaMatrix, selectedDoctor, doctorMatrix } = vm
            doctorMatrix.forEach(row => {
                calender.forEach((x, i) => {
                    if (x.is_holiday) {
                        row[i].class = ['holiday']
                    }
                })
            });
            areaMatrix.forEach(row => {
                calender.forEach((x, i) => {
                    if (x.is_holiday) {
                        row[i].class = ['holiday']
                        // row[i].message = { text: 'holiday', class: 'green' } for example
                    }
                })
            });
        }
    }
}