
function requireAuth (to, from, next) {
  if (!window.user) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'history', component: () => import('pages/History.vue') },
      { path: 'dashborad', component: () => import('pages/Dashboard.vue') },
      { path: 'history-admin', component: () => import('pages/HistoryAdmin.vue') },
      { path: 'users', component: () => import('pages/UsersManager.vue') }
    ],
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
