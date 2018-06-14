export default {
    getWorkingSheetByUserSection: state => {
        return state.sheetTable.filter(sheet =>
            state.currentUser.section == sheet.section && sheet.status=="working")
    },
    getPublishedSheetByUserSection: state => {
        return state.sheetTable.filter(sheet =>
            state.currentUser.section == sheet.section && (sheet.status=="published"||sheet.status=="denied"))
    },
    getSheetByID: state => sheet_id => {
        return state.sheetTable.find(sheet => sheet.sheet_id === sheet_id)
    },
    getDoctorByUserSection: state => {
        return state.doctorTable.filter(doctor =>
            state.currentUser.section == doctor.section)
    },
    getBookDatesByDoctorYearMonth: state => (doctor_id, year, month) => {
        let findDoctorBookDate = state.bookDate.find(
            x => x.doctor_id == doctor_id &&
                x.year == year &&
                x.month == month);
        if (findDoctorBookDate) {
            return findDoctorBookDate.book_dates;
        } else {
            return JSON.stringify([]);
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
    }
}