import Vue from 'vue'
import store from '@/store/store'
import Router from 'vue-router'

import Container from '@/components/container/container'
import MainPage from '@/components/container/main-page'

import DoctorListManage from '@/components/manager/doctor-list-manage'

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
          path: ':doctor-list-manage',
          name: 'DoctorListManage',
          component: DoctorListManage,
        }
      ]
    }
  ]
})
