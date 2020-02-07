const mutations = {
  SHOW: (state, payload) => {
    state.alert = payload;
  },
};

const state = {
  alert: false,
};


export default {
  namespaced: true,
  state,
  mutations,
};
