import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/components/container/container'
import MainPage from '@/components/container/main-page'

import DoctorListManage from '@/components/manager/doctor-list-manage'
import TypeListManage from '@/components/manager/type-list-manage'
import WorkhourListManage from '@/components/manager/workhour-list-manage'
import CalenderManage from '@/components/manager/calender-manage'
import SheetManage from '@/components/manager/sheet-manage'

import SheetSelect from '@/components/arranger/sheet-select'
import DoctorArrange from '@/components/arranger/doctor-arrange'
import TypeArrange from '@/components/arranger/type-arrange'
import WorkhourArrange from '@/components/arranger/workhour-arrange'
import AreaArrange from '@/components/arranger/area-arrange'
import ShiftArrange from '@/components/arranger/shift-arrange'
import ShiftSummary from '@/components/arranger/shift-summary'

import BookDate from '@/components/employee/book-date'

import SheetQuery from '@/components/querier/sheet-query'
import SheetView from '@/components/querier/sheet-view'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Container,
      children: [
        {
          path: '',
          name: 'MainPage',
          component: MainPage,
        },
        {
          path: '/doctor-list-manage',
          name: 'DoctorListManage',
          component: DoctorListManage,
        },
        {
          path: '/type-list-manage',
          name: 'TypeListManage',
          component: TypeListManage,
        },
        {
          path: '/workhour-list-manage',
          name: 'WorkhourListManage',
          component: WorkhourListManage,
        },
        {
          path: '/calender-manage',
          name: 'CalenderManage',
          component: CalenderManage,
        },
        {
          path: '/sheet-manage',
          name: 'SheetManage',
          component: SheetManage,
        },
        {
          path: '/sheet-select',
          name: 'SheetSelect',
          component: SheetSelect,
          children: [
            {
              path: 'doctor-arrange',
              name: 'DoctorArrange',
              component: DoctorArrange,
            },
            {
              path: 'type-arrange',
              name: 'TypeArrange',
              component: TypeArrange,
            },
            {
              path: 'workhour-arrange',
              name: 'WorkhourArrange',
              component: WorkhourArrange,
            },
            {
              path: 'area-arrange',
              name: 'AreaArrange',
              component: AreaArrange,
            },
            {
              path: 'shift-arrange',
              name: 'ShiftArrange',
              component: ShiftArrange,
            }, {
              path: 'shift-summary',
              name: 'ShiftSummary',
              component: ShiftSummary,
            }
          ]
        }, {
          path: '/book-date',
          name: 'BookDate',
          component: BookDate,
        },
        {
          path: '/sheet-query',
          name: 'SheetQuery',
          component: SheetQuery,
          children: [{
            path: 'sheet-view',
            name: 'SheetView',
            component: SheetView,
          }
          ]
        }
      ]
    }
  ]
})
