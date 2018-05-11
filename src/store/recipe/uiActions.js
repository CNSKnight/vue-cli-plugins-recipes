import recipeTemplate from "../models/recipeTemplate";
import { cloneDeep } from "lodash";
export default {
  selectRecipe({ dispatch }, recipe) {
    dispatch("loadRecipe", recipe);
  },

  // needed?
  // stage({ commit }, recipe) {
  //   commit('stage', { ...recipe })
  // },

  cancel({ commit }) {
    commit("cancel");
  },

  reset({ commit }) {
    commit("reset");
  },

  // for collections
  addItem({ commit }, { prop }) {
    if (recipeTemplate[prop]) {
      let item = cloneDeep(recipeTemplate[prop][0]);
      switch (prop) {
        case "method":
          item.step = recipeTemplate[prop].length + 1;
          break;
        case "tag":
          item.priority = item.length + 1;
          break;
        default:
      }
      commit("addTo", { prop: prop, item: item });
    }
  },

  deleteItem({ state, commit }, { prop, index }) {
    if (
      recipeTemplate[prop] &&
      state.recipe[prop] &&
      state.recipe[prop][index]
    ) {
      let val = cloneDeep(state.recipe[prop]);
      val.splice(index, 1);
      switch (prop) {
        case "method":
          val.forEach((item, idx) => {
            item.step = idx + 1;
          });
          break;
        default:
      }
      commit("replaceProperty", { prop: prop, val: val });
    }
  },

  // @todo order({ state, commit }, { prop, index }) {},

  onChangeRate(value) {
    // Set the value of the selectUA recipe's rating to the
    // value passed up from the `rating` sub-component
    this.recipe.rating = value;
  }
};
