export default {
    check(vm,changed) {
        this.test.check(vm,changed)
        console.log('checking: changed=',changed)
    },
    test: {
        description: "test",
        check(vm) {
            let { areaList, doctorList, calender } = vm.sheetContent
            let { selectedArea, areaMatrix, selectedDoctor, doctorMatrix } = vm
            doctorMatrix.forEach(row => {
                row.forEach(cell => {
                    cell.class = ['bg-grey']
                    cell.message = [{ text: 'hi', class: 'red' }]
                })
            });
            areaMatrix.forEach(row => {
                row.forEach(cell => {
                    cell.class = ['bg-grey']
                    cell.message =[{ text: 'hi', class: 'red' }]
                })
            });
        }
    }
}