export default {
    getWorkingSheetByUserSection: state => {
        return state.sheetTable.filter(sheet =>
            state.currentUser.section == sheet.section && sheet.status == "working")
    },
    getPublishedSheetByUserSection: state => {
        return state.sheetTable.filter(sheet =>
            state.currentUser.section == sheet.section && (sheet.status == "published" || sheet.status == "denied"))
    },
    getLastPublishedSheetByUserSection: state => {
        let result = [];
        let publishedSheet = state.sheetTable.filter(sheet =>
            state.currentUser.section == sheet.section && sheet.status == "published")
        let sorted = _.sortBy(publishedSheet, sheet => Number(sheet.year) * 12 + Number(sheet.month))
        if (!_.isEmpty(sorted)) { result.push(sorted[sorted.length - 1]) }
        return result;
    },
    getSheetByID: state => sheet_id => {
        return state.sheetTable.find(sheet => sheet.sheet_id === sheet_id)
    },
    getDoctorByUserSection: state => {
        return state.doctorTable.filter(doctor =>
            state.currentUser.section == doctor.section)
    },
    getdoctorByID: state => doctor_id => {
        return state.doctorTable.find(doctor =>
            doctor.doctor_id == doctor_id)
    },
    getdoctorByCode: state => code => {
        return state.doctorTable.filter(doctor =>
            doctor.code.indexOf(code) !== -1)
    },
    getBookDatesByDoctorYearMonth: state => (doctor_id, year, month) => {
        let findDoctorBookDate = state.bookDate.filter(
            x => x.doctor_id == doctor_id &&
                x.year == year &&
                x.month == month);
        if (!_.isEmpty(findDoctorBookDate)) {
            return findDoctorBookDate;
        } else {
            return [];
        }
    },
    getTypeByUserSection: state => {
        return state.typeTable.filter(type =>
            state.currentUser.section == type.section)
    },
    getWorkhourByUserSection: state => {
        return state.workhourTable.filter(workhour =>
            state.currentUser.section == workhour.section)
    },
    getCalenderByYearMonth: state => (year, month) => {
        return state.calenderTable.filter(x => {
            let date = new Date(x.date);
            return date.getFullYear() == year && (date.getMonth() + 1) == month
        })
    },
    querySheetListBy: state => payload => {
        return state.sheetTable.filter(x =>
            x.status == "published"
        )
    }
}