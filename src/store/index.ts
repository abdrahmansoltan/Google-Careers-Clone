import actions from "@/store/actions";
import getters from "@/store/getters";
import mutations from "@/store/mutations";
import state from "@/store/state";
import GlobalState from "@/store/types";
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";

// define injection key
export const key: InjectionKey<Store<GlobalState>> = Symbol();

const store = createStore<GlobalState>({
  state,
  mutations,
  getters,
  actions,
  strict: process.env.NODE_ENV !== "production", // prevents mutation of the store's state outside of the mutation
});

export default store;
