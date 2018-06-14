let getNextSheetID = (sheetTable) => {
    let last_sheet_id = sheetTable[sheetTable.length - 1].sheet_id;
    let next_sheet_id = "S" + _.padStart(Number(last_sheet_id.match(/\d+/)[0]) + 1, 2, '0');
    return next_sheet_id
}
let getNextVersion = (sheetTable, year, month, section) => {
    let selectedSheet = sheetTable.filter(sheet => sheet.year == year && sheet.month == month && sheet.section == section)
    if (_.isEmpty(selectedSheet)) {
        return "1";
    }
    let currentMaxVersion = _.maxBy(selectedSheet, 'version').version
    return Number(currentMaxVersion) + 1;
}

export default {
    addSheet: state => {
        let year = state.enviroment.new_sheet_year;
        let month = state.enviroment.new_sheet_month;
        let section = state.currentUser.section;
        let sheetTable = state.sheetTable;
        if (_.some(sheetTable, sheet => sheet.year == year //檢查是否已經有working sheet
            && sheet.month == month
            && sheet.section == section
            && sheet.status == "working")) {
            return;
        }
        let blankSheet = {
            sheet_id: getNextSheetID(sheetTable),
            year,
            month,
            section,
            version: getNextVersion(sheetTable, year, month, section),
            status: 'working',
            content: ''
        }
        sheetTable.push(blankSheet);
    },
    deleteSheet: (state, payload) => {
        let sheet_id = payload.sheet.sheet_id;
        let sheetTable = state.sheetTable;
        let user_section = state.currentUser.section;
        let index = sheetTable.findIndex(x => x.sheet_id == sheet_id);

        if (sheetTable[index].section != user_section) { return; } //檢查身分
        if (index >= 0 && sheetTable[index].status == "working") {
            sheetTable[index].status = "deleted"
        }
    },
    publishSheet: (state, payload) => {
        let year = payload.sheet.year;
        let month = payload.sheet.month;
        let sheet_id = payload.sheet.sheet_id;
        let sheetTable = state.sheetTable;
        let user_section = state.currentUser.section;
        let index = sheetTable.findIndex(x => x.sheet_id == sheet_id);

        if (sheetTable[index].section != user_section) { return; } //檢查身分
        if (_.some(sheetTable, sheet => sheet.year == year //檢查是否已經有published sheet
            && sheet.month == month
            && sheet.section == user_section
            && sheet.status == "published")) {
            return;
        }
        if (index >= 0 &&
            (sheetTable[index].status == "working"
                || sheetTable[index].status == "denied")) { //deleted sheet不可publish
            sheetTable[index].status = "published"
        }
    },
    denySheet: (state, payload) => {
        let sheet_id = payload.sheet.sheet_id;
        let sheetTable = state.sheetTable;
        let user_section = state.currentUser.section;
        let index = sheetTable.findIndex(x => x.sheet_id == sheet_id);

        if (sheetTable[index].section != user_section) { return; } //檢查身分
        if (index >= 0 && sheetTable[index].status == "published") {
            sheetTable[index].status = "denied"
        }
    }, saveSheet: (state, payload) => {
        let sheet_id = payload.sheet_id;
        let content = payload.content;
        let sheetTable = state.sheetTable;
        let user_section = state.currentUser.section;
        let index = sheetTable.findIndex(x => x.sheet_id == sheet_id);

        if (sheetTable[index].section != user_section) { return; } //檢查身分
        if (index >= 0 && sheetTable[index].status == "working") {
            sheetTable[index].content = content;
        }
    }

}