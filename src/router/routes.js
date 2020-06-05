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
      { path: '/', component: () => import('pages/Home/Home.vue') },
      { path: 'dashboard', component: () => import('pages/Dashboard/Dashboard.vue') },
      { path: 'categorias', component: () => import('pages/Categoria/ListaCategoria.vue') },
      { path: 'subcategorias', component: () => import('pages/SubCategoria/ListaSubCategoria.vue') },
   
      { path: 'cliente', component: () => import('pages/Cliente/ListaCliente.vue') },
      { path: 'atividade', component: () => import('pages/Atividade/ListaAtividade.vue') },
      { path: 'agenda', component: () => import('pages/Agenda/ListaAgenda.vue') },
      { path: 'agendamento', component: () => import('pages/Agendamento/ListaAgendamento.vue') },
      { path: 'detalhe', component: () => import('pages/Atividade/Detalhes.vue') },
      { path: 'usuario', component: () => import('pages/Usuario/ListaUsuario.vue') },
    ],
    beforeEnter: ifAuthenticated,
  },
  {
    path: '/login',
    component: () => import('pages/Login/Login.vue'),
  },
  {
    path: '/registracliente',
    component: () => import('pages/Cliente/RegistraCliente.vue'),
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
