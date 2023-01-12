import { createStore } from "vuex";

export const LOGIN_USER = "LOGIN_USER";

export const state = () => {
  return {
    isLoggedIn: false,
  };
};
export const mutations = {
  [LOGIN_USER](state) {
    state.isLoggedIn = true;
  },
};

const store = createStore({
  state,
  mutations,
  strict: process.env.NODE_ENV !== "production", // prevents mutation of the store's state outside of the mutation
});

export default store;
