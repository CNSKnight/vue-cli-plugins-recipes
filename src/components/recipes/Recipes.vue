<template>
  <div class="row">
    <div class="col s12 m5 stack">
      <template v-if="!hasRecipes">
        <p v-if="!hasRecipes">No recipes were provided</p>
      </template>
      <template v-else>
        <ul class="recipes collection with-header">
          <li class="collection-header">
            <h4 class="action-bar">Recipes
              <button class="btn btn-flat right" @click="toggle('showCards')">
                <i v-text="showCards ? 'view_list' : 'view_agenda'" class="material-icons medium orange-text text-lighten-2"></i>
              </button>
            </h4>
          </li>
          <recipes-listing v-if="! showCards">
            <div idkyet>{{'Recipes Loading'}}...</div>
          </recipes-listing>
          <recipes-cards v-if="showCards" v-bind="{transformMarkdown}">
          </recipes-cards>
        </ul>
        <blockquote v-if="isPreAuth">@note Posts and Puts won't work with preAuth from a non-same-origin.</blockquote>
        <div class="backwall"></div>
      </template>
    </div>
    <div class="col s12 m7">
      <recipe-details v-bind="{transformMarkdown}"></recipe-details>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import RecipesListing from "@/components/recipes-listing/RecipesListing";
import RecipesCards from "@/components/recipes-cards/RecipesCards";
import RecipeDetails from "@/components/recipe-details/RecipeDetails";
import * as MarkdownIt from "markdown-it";
const md = MarkdownIt({
  html: true,
  linkify: false,
  html_inline: true,
  escape: false
});

export default {
  components: {
    "recipes-listing": RecipesListing,
    "recipes-cards": RecipesCards,
    "recipe-details": RecipeDetails
  },
  data: () => {
    return { showCards: false, isPreAuth: null };
  },
  // computed: {...mapGetters(['recipes'])},
  computed: {
    hasRecipes() {
      console.log(this.$store);
      return this.$store.getters.recipes.length;
    }
  },
  methods: {
    toggle(what) {
      this.hasOwnProperty(what) && (this[what] = !this[what]);
    },
    ...mapActions([]),
    transformMarkdown(markdown) {
      return markdown && md.render(markdown);
    }
  },
  created() {
    this.$store.dispatch("loadRecipes");
  }
};
</script>

<style scoped>
.stack {
  position: relative;
}
.recipes {
  z-index: 2;
}
.preview {
  z-index: 3;
}
.backwall {
  position: absolute;
  background-color: white;
  height: 99vh;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}
</style>
