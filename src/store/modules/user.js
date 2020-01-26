import Vue from 'vue';
import { http } from '../../service/Http';

const getters = {
  isAdmin: state => state.user.admin,
  getUser: state => state.user,
  isUserLoaded: state => !!state.user.name,
};

const actions = {
  USER_REQUEST: ({ commit, dispatch }) => {
    commit('USER_REQUEST');
    http.get('http://191.190.100.27:9005/api/me')
      .then((resp) => {
        commit('USER_SUCCESS', resp.data);
      })
      .catch(() => {
        commit('USER_ERROR');
        dispatch('auth/AUTH_LOGOUT', null, { root: true });
      });
  },
};

const mutations = {
  USER_REQUEST: (state) => {
    state.status = 'loading';
  },
  USER_SUCCESS: (state, resp) => {
    state.status = 'success';
    Vue.set(state, 'user', resp);
  },
  USER_ERROR: (state) => {
    state.status = 'error';
  },
  AUTH_LOGOUT: (state) => {
    state.user = {};
  },
};

const state = {
  user: {},
  status: '',
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
