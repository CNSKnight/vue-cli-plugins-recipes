// actions commit mutations
// actions can cantain arbitrary asynchronous operations
import uiActions from "./uiActions";
import asyncActions from "./asyncActions";
import recipeTemplate from "../models/recipeTemplate";
import { getField, updateField } from "vuex-map-fields";
import { isEqual, cloneDeep } from "lodash";
import VuexPersistence from "vuex-persist";
import Vue from "vue";

const state = {
  staged: cloneDeep(recipeTemplate),
  recipe: cloneDeep(recipeTemplate),
  modifieds: {}
};

const getters = {
  recipe(state) {
    return state.recipe;
  },
  isModified(state) {
    return !isEqual(state.recipe, state.staged);
  },
  hasChanges: state => id => {
    return state.modifieds[id] !== undefined;
  },
  getModified: state => id => {
    return state.modifieds[id];
  },
  // return the updated if beyond 3 days of published/creation dates
  updatedDate(state) {
    let recipe = state.recipe;
    let pd =
      (recipe.publishedDate || recipe.creationDate) &&
      new Date(recipe.publishedDate || recipe.creationDate);
    let ud = pd && recipe.updatedDate && new Date(recipe.updatedDate);
    if (
      ud &&
      ud > new Date(pd.getFullYear(), pd.getMonth(), pd.getDate() + 3)
    ) {
      return ud;
    }
  },
  getField
};

const actions = { ...asyncActions, ...uiActions };

// In Vuex, mutations are synchronous transactions
const mutations = {
  stage(state, recipe) {
    state.staged = cloneDeep(recipe);
    state.recipe = cloneDeep(recipe);
    recipe.id && Vue.delete(state.modifieds, recipe.id);
  },
  cancel: state => {
    state.recipe = null;
    state.staged = null;
  },
  reset: state => {
    state.recipe = cloneDeep(state.staged);
    Vue.delete(state.modifieds, state.recipe.id);
  },
  updateField,
  addTo(state, payload) {
    payload.prop &&
      state.recipe[payload.prop] &&
      state.recipe[payload.prop].push(payload.item);
  },
  replaceProperty: (state, payload) => {
    payload.prop && (state.recipe[payload.prop] = payload.val);
  },
  setModified: (state, payload) => {
    if (payload.key) {
      if (payload.val) {
        Vue.set(state.modifieds, payload.key, payload.val);
      } else {
        Vue.delete(state.modifieds, payload.key);
      }
    }
  },
  update(state, recipe) {
    this.commit("stage", recipe);
  }
};

// called after every mutation.
// The mutation comes in the format of `{ type, payload }`.
const syncModifiedsPlugin = store => {
  // called when the store is initialized
  store.subscribe((mutation, state) => {
    if (["updateField", "replaceProperty"].indexOf(mutation.type) !== -1) {
      store.commit("setModified", {
        key: state.recipeModule.recipe.id,
        val: cloneDeep(state.recipeModule.recipe)
      });
    }
  });
};
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: "recipe",
  reducer: state => ({ modifieds: state.recipeModule.modifieds })
});

// recipeModule
export default {
  state,
  getters,
  actions,
  mutations,
  plugins: [syncModifiedsPlugin, vuexLocal.plugin]
};
