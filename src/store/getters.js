export default {
    getSheetByUserSection: state => {
        return state.sheetTable.filter(sheet =>
            state.currentUser.arrange_section.indexOf(sheet.section) >= 0)
    },
    getSheetByID: state => sheet_id => {
        return state.sheetTable.find(sheet => sheet.sheet_id === sheet_id)
    },
    getDoctorByUserSection: state => {
        return state.doctorTable.filter(doctor =>
            state.currentUser.arrange_section.indexOf(doctor.section) >= 0)
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
    }
}