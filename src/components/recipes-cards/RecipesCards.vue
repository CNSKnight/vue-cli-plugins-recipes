<template>
    <div>
        <li class="card" :class="{active: recipes.selected && (recipes.selected.id === recipe.id)}"
            style="overflow: hidden;" v-for="recipe in recipes" :key="recipe.acapID"
            @click="selectRecipe(recipe)">
            <div class="card-image waves-effect waves-block waves-light">
                <img class="activator" src="images/office.jpg">
            </div>
            <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">
                    <span class="secondary-content left">
                        <i class="material-icons amber-text text-lighten-2" v-text="recipe.published ? 'visibility' : 'visibility_off'"></i>
                    </span>
                    {{recipe.title}}
                    <i class="material-icons right">more_vert</i>
                </span>
            </div>
            <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#" @click.stop="deleteUA.emit(recipe)">
                    <i class="material-icons">delete_forever</i>
                </a>
            </div>
            <div class="card-reveal" style="display: none; transform: translateY(0px);">
                <span class="card-title grey-text text-darken-4">{{recipe.title}}
                    <i class="material-icons right">close</i>
                </span>
                <!--div>
            <rating-comp [interactive]="false" [rate]="recipe.rating"></rating-comp>
            {{recipe.rating}}
        </div-->
                <p>
                    <span class="chip" v-for="(tag, idx) in recipe.tags" :key="idx">#{{tag.text}}</span>
                </p>
                <div>
                    Created by: {{recipe.creator}}
                </div>
                <div v-html="transformMarkdown(recipe.description)"></div>
            </div>
        </li>

    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    transformMarkdown: Function
  },
  computed: { ...mapGetters(["recipes", "hasChanges"]) },
  // st about modules needing to be namespaced to use mapState?
  // computed: mapState('recipesModule', ['recipes']),
  methods: {
    ...mapActions(["selectRecipe"])
  }
};
</script>

<style scoped>
</style>
