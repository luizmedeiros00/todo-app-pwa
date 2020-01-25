import store from '../store/index';

const ifAuthenticated = (to, from, next) => {
  if (store.getters['auth/isAuthenticated']) {
    next();
    return;
  }

  next('/login');
};

const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: 'dashboard', component: () => import('pages/Dashboard/Dashboard.vue') },
      { path: 'cliente', component: () => import('pages/Cliente/ListaCliente.vue') },
      { path: 'atividade', component: () => import('pages/Atividade/ListaAtividade.vue') },
      { path: 'detalhe', component: () => import('pages/Atividade/Detalhes.vue') },
      { path: 'usuario', component: () => import('pages/Usuario/ListaUsuario.vue') },
    ],
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    component: () => import('pages/Login/Login.vue'),
  },
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
