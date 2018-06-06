import Vue from 'vue'
import Vuex from 'vuex'
import mutation from './mutation'
import action from './action'
import getter from './getter'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        doctorTable: [
            { doctor_id: 'D01', id: 'F123456789', name: "王大明", section: 'PED', phs: '3999', code: 'DOC3999A' },
            { doctor_id: 'D02', id: 'A123456789', name: "張國強", section: 'PED', phs: '3987', code: 'DOC3987B' }
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
            { sheet_id: 'S01', year: '2018', month: '7', section: 'PED', version: '1', status: 'working', content: '' }
        ]
    },
    getter,
    mutation,
    action
})