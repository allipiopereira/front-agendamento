import Vue from 'vue'
import VueRouter from 'vue-router'
import Agendar from '../views/Agendar'
import Agendados from '../views/Agendados'

Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/agendar'
          },
        {
            path: '/agendar',
            name: 'Agendar',
            component: Agendar
        },
        {
            path: '/agendados',
            name: 'Agendados',
            component: Agendados
        }
    ]
})

export default router