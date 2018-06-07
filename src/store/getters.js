export default {
    getSheetByUserSection: state => {
        return state.sheetTable.filter(sheet =>
            state.currentUser.arrange_section.indexOf(sheet.section) >= 0)
    },
    getSheetByID: state => query_id => {
        return state.sheetTable.find(sheet => sheet.sheet_id === query_id)
    },
    getDoctorByUserSection: state => {
        return state.doctorTable.filter(doctor =>
            state.currentUser.arrange_section.indexOf(doctor.section) >= 0)
    },
}