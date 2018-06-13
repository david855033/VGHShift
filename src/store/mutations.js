let getNextSheetID = (sheetTable) => {
    let last_sheet_id = sheetTable[sheetTable.length - 1].sheet_id;
    let next_sheet_id = "S" + _.padStart(Number(last_sheet_id.match(/\d+/)[0]) + 1, 2, '0');
    return next_sheet_id
}
let getNextVersion = (sheetTable, year, month, section) => {
    let selectedSheet = sheetTable.filter(sheet => sheet.year == year && sheet.month == month && sheet.section == section)
    let currentMaxVersion = _.maxBy(selectedSheet, 'version').version
    return Number(currentMaxVersion) + 1;
}

export default {
    addSheet: state => {
        let year = state.enviroment.new_sheet_year;
        let month = state.enviroment.new_sheet_month;
        let section = state.currentUser.section;
        let blankSheet = {
            sheet_id: getNextSheetID(state.sheetTable),
            year,
            month,
            section,
            version: getNextVersion(state.sheetTable, year, month, section),
            status: 'working',
            content: ''
        }
        state.sheetTable.push(blankSheet);
    }
}