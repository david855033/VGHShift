import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

//---test code for data stab--//
let createDoctorTable = function (parameter) {
    let doctor_id = 0;
    let result = [];
    for (var key in parameter) {
        for (var i = 0; i < parameter[key]; i++) {
            result.push(
                {
                    doctor_id: 'D' + doctor_id, id: 'F123456789', name: "醫(" + key + ")" + i,
                    grade: key, section: 'PED', phs: '0000', code: 'DOC0000A'
                })
            doctor_id++
        }
    }
    return result;
}

export default new Vuex.Store({
    state: {
        enviroment: {
            new_sheet_year: 2018,
            new_sheet_month: 7,
        },
        currentUser: {
            user_id: "U01", section: "PED"
        },
        doctorTable: [...createDoctorTable({ V: 5, CR: 5, R3: 5, R2: 5, R1: 5, PGY: 10 }),

        { doctor_id: 'D99', id: 'F123456789', name: "王大明", grade: "V", section: 'SURG', phs: '2100', code: 'DOC2100A' }
        ],

        typeTable: [
            { type_id: 'T01', section: 'PED', description: '住院醫師班', work_to_work: "1630-0730", work_to_holiday: "1630-0800", holiday_to_work: "0800-0730", holiday_to_holiday: "0800-0800" },
            { type_id: 'T02', section: 'PED', description: '急診夜班', work_to_work: "1930-0730", work_to_holiday: "1930-0730", holiday_to_work: "1930-0730", holiday_to_holiday: "1930-0730" },
            { type_id: 'T03', section: 'PED', description: '急診白斑', work_to_work: "0730-1730", work_to_holiday: "0730-1730", holiday_to_work: "0730-1730", holiday_to_holiday: "0730-1730" }
        ],
        workhourTable: [
            { workhour_id: 'W01', section: 'PED', description: '住院醫師上班日', start_work: '0730', end_work: '16:30', nap: '30', pm_off: '12:00' }
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
            { date: '2018-07-15', weekday: "0", is_holiday: true, description: "" },
            { date: '2018-07-16', weekday: "1", is_holiday: false, description: "" },
            { date: '2018-07-17', weekday: "2", is_holiday: false, description: "" },
            { date: '2018-07-18', weekday: "3", is_holiday: false, description: "" },
            { date: '2018-07-19', weekday: "4", is_holiday: false, description: "" },
            { date: '2018-07-20', weekday: "5", is_holiday: false, description: "" },
            { date: '2018-07-21', weekday: "6", is_holiday: true, description: "" },
            { date: '2018-07-22', weekday: "0", is_holiday: true, description: "" },
            { date: '2018-07-23', weekday: "1", is_holiday: false, description: "" },
            { date: '2018-07-24', weekday: "2", is_holiday: false, description: "" },
            { date: '2018-07-25', weekday: "3", is_holiday: false, description: "" },
            { date: '2018-07-26', weekday: "4", is_holiday: false, description: "" },
            { date: '2018-07-27', weekday: "5", is_holiday: false, description: "" },
            { date: '2018-07-28', weekday: "6", is_holiday: true, description: "" },
            { date: '2018-07-29', weekday: "0", is_holiday: true, description: "" },
            { date: '2018-07-30', weekday: "1", is_holiday: false, description: "" },
            { date: '2018-07-31', weekday: "2", is_holiday: false, description: "" }
        ],
        sheetTable: [
            { sheet_id: 'S01', year: '2018', month: '5', section: 'PED', version: '1', status: 'published', content: '' },
            { sheet_id: 'S02', year: '2018', month: '6', section: 'PED', version: '1', status: 'published', content: '' },
            { sheet_id: 'S03', year: '2018', month: '7', section: 'PED', version: '1', status: 'working', content: '' },
            { sheet_id: 'S04', year: '2018', month: '7', section: 'SURG', version: '1', status: 'working', content: '' },
        ],
        bookDate: [
            { doctor_id: 'D1', year: 2018, month: 7, date: 1, expect: "n", description: "結婚" },
            { doctor_id: 'D1', year: 2018, month: 7, date: 2, expect: "n", description: "出國" },
            { doctor_id: 'D1', year: 2018, month: 7, date: 3, expect: "n", description: "小孩畢業典禮" },
            { doctor_id: 'D1', year: 2018, month: 7, date: 5, expect: "y", description: "這天想值班" }
        ]
    },
    getters,
    mutations,
    actions
})