import Vue from 'vue'
import Vuex from 'vuex'
import mutation from './mutation'
import action from './action'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: {
            user_id: "U01", arrange_section: ["PED"]
        },
        doctorTable: [
            { doctor_id: 'D01', id: 'F123456789', name: "王大明", grade: "R2", section: 'PED', phs: '3999', code: 'DOC3999A' },
            { doctor_id: 'D02', id: 'A123456789', name: "張國強", grade: "R2", section: 'PED', phs: '3987', code: 'DOC3987B' },
            { doctor_id: 'D03', id: 'Z123456789', name: "李小華", grade: "V", section: 'SURG', phs: '2345', code: 'DOC2456A' }
        ],
        typeTable: [
            { type_id: 'T01', type_id: '1', section: 'PED', description: '住院醫師班', work_to_work: "1630-0730", work_to_holiday: "1630-0800", holiday_to_work: "0800-0730", holiday_to_holiday: "0800-0800" }
        ],
        calenderTable: [
            { date: '2018-07-01', weekday: "0", is_holiday: true, description: "" },
            { date: '2018-07-02', weekday: "1", is_holiday: false, description: "" },
            { date: '2018-07-03', weekday: "2", is_holiday: false, description: "" },
            { date: '2018-07-04', weekday: "3", is_holiday: false, description: "" },
            { date: '2018-07-05', weekday: "4", is_holiday: true, description: "美國國慶日" },
            { date: '2018-07-06', weekday: "5", is_holiday: false, description: "" },
            { date: '2018-07-07', weekday: "6", is_holiday: true, description: "" },
            { date: '2018-07-08', weekday: "0", is_holiday: true, description: "" },
            { date: '2018-07-09', weekday: "1", is_holiday: false, description: "" },
            { date: '2018-07-10', weekday: "2", is_holiday: false, description: "" },
            { date: '2018-07-11', weekday: "3", is_holiday: false, description: "" },
            { date: '2018-07-12', weekday: "4", is_holiday: false, description: "" },
            { date: '2018-07-13', weekday: "5", is_holiday: false, description: "" },
            { date: '2018-07-14', weekday: "6", is_holiday: true, description: "" },
            { date: '2018-07-15', weekday: "0", is_holiday: true, description: "" }
        ],
        sheetTable: [
            { sheet_id: 'S01', year: '2018', month: '7', section: 'PED', version: '1', status: 'working', content: '' },
            { sheet_id: 'S02', year: '2018', month: '7', section: 'SURG', version: '1', status: 'working', content: '' }
        ],
        bookDate: [
            {
                doctor_id: 'D01', year: 2018, month: 7,
                book_dates: JSON.stringify([
                    { date: 1, expect: "n", description: "lazy" },
                    { date: 2, expect: "n", description: "lazy" },
                    { date: 3, expect: "n", description: "lazy" }])
            }
        ]
    },
    getters,
    mutation,
    action
})