import Vue from 'vue'
import Router from 'vue-router'
import site from '@/common/site'
import news from '@/common/news'
import tiyu from '@/common/tiyu'
import auto from '@/common/auto'
import junshi from '@/common/junshi'


import watchProject from '@/project/watchProject'
import addProject from '@/project/addProject'
import editProject from '@/project/editProject'


import login from '@/user/login'
import user from '@/user/editUser'
import edPic from '@/user/editPic'
import edName from '@/user/editName'
import edPwd from '@/user/editPwd'
import register from '@/user/register'


import charge from '@/choose/charge'
import position from '@/choose/position'
import department from '@/choose/department'
import project from '@/choose/project'
import weather from '@/choose/weather'
import progress from '@/choose/progress'


import addMan from '@/man/addMan'

import addEditFarmeWork from '@/framework/addEditFarmeWork'


import addDiary from '@/diary/addDiary'
import watchDiary from '@/diary/watchDiary'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'site',
        component: site,
    }, {
        path: "/news",
        name: "news",
        component: news,
    }, {
        path: '/tiyu',
        name: 'tiyu',
        component: tiyu,
    }, {
        path: '/auto',
        name: 'auto',
        component: auto,
    }, {
        path: '/junshi',
        name: "junshi",
        component: junshi,
    }, {
        path: '/watchProject',
        name: "watchProject",
        component: watchProject,
    }, {
        path: '/addProject',
        name: 'addProject',
        component: addProject,
    }, {
        path: '/editProject',
        name: 'editProject',
        component: editProject,
    }, {
        path: '/login',
        name: 'login',
        component: login,
    }, {
        path: '/user',
        name: 'user',
        component: user,
    }, {
        path: '/edPic',
        name: 'edPic',
        component: edPic,
    }, {
        path: '/edName',
        name: 'edName',
        component: edName,
    }, {
        path: '/edPwd',
        name: 'edPwd',
        component: edPwd,
    }, {
        path: '/register',
        name: 'register',
        component: register,
    }, {
        path: '/charge',
        name: 'charge',
        component: charge
    }, {
        path: '/position',
        name: 'position',
        component: position,
    }, {
        path: '/department',
        name: 'department',
        component: department,
    }, {
        path: '/project',
        name: 'project',
        component: project,
    }, {
        path: '/weather',
        name: 'weather',
        component: weather,
    }, {
        path: '/progress',
        name: 'progress',
        component: progress,
    }, {
        path: '/addMan',
        name: 'addMan',
        component: addMan,
    }, {
        path: '/addEditFarmeWork',
        name: 'addEditFarmeWork',
        component: addEditFarmeWork,
    }, {
        path: '/addDiary',
        name: 'addDiary',
        component: addDiary,
    }, {
        path: '/watchDiary',
        name: 'watchDiary',
        component: watchDiary,
    }]
})

Vue.component('backHeader', {
    props: ['message', 'backUrl'],
    template: `<header class="evaluate-header"><router-link :to="backUrl"><i class="back"></i></router-link>{{message}}</header>`
})

Vue.component('noBackHeader', {
    props: ['message', ],
    template: `<header class="evaluate-header">{{message}}</header>`
})

Vue.component('addHeader', {
    props: ['message', 'backUrl', 'addUrl'],
    template: `<header class="evaluate-header"><router-link :to="backUrl"><i class="back"></i></router-link>{{message}}
    <router-link :to="addUrl"><i class="add">+</i></router-link></header>`
})

Vue.component('allFooter', {
    props: ['manage', 'backUrl', 'login', 'addUrl'],
    template: `<div class="footer"><router-link :to="backUrl"><span>{{manage}}</span></router-link>
    <router-link :to="addUrl"><span>{{login}}</span></router-link></div>`
})