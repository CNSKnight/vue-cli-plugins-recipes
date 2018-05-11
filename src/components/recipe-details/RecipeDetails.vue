<template src="./details.html"></template>

<script>
import { mapFields, mapMultiRowFields } from "vuex-map-fields";
import { mapGetters, mapActions } from "vuex";
import ActionsBar from "@/components/actions-bar/ActionsBar";
import RecipePreview from "@/components/recipe-preview/RecipePreview";
import { padStart } from "lodash";
export default {
  props: {
    transformMarkdown: Function
  },
  data() {
    return { preview: false };
  },
  components: {
    "actions-bar": ActionsBar,
    "recipe-preview": RecipePreview
  },
  computed: {
    ...mapGetters(["isModified"]),
    ...mapFields([
      "recipe.id",
      "recipe.acapID",
      "recipe.published",
      "recipe.subTitle",
      "recipe.creator",
      "recipe.originalUrl",
      "recipe.description",
      "recipe.notes"
    ]),
    ...mapMultiRowFields([
      "recipe.ingredients",
      "recipe.method",
      "recipe.tags",
      "recipe.variations"
    ]),
    valid() {
      return true;
    }
  },
  watch: {
    // data(newValue, oldValue) {}
  },

  methods: {
    ...mapActions(["loadRecipe", "save", "cancel", "reset", "addTo"]),
    // get textarea label
    getTALabel(idx) {
      return "Step #".concat(padStart((idx + 1).toString(), 2, "0"));
    },
    // get textarea ID
    getTAID(id, idx) {
      let label = id !== undefined ? id : "newID";
      let count = idx + 1;
      return label.toString().concat("-rTA-", count.toString());
    },
    addItem(what) {
      this.$store.dispatch("addItem", { prop: what });
    },
    deleteItem(what, idx) {
      this.$store.dispatch("deleteItem", { prop: what, index: idx });
    },
    onReset() {
      this.$store.dispatch("reset");
    },
    onCancel() {},
    onSubmit() {
      this.$store.dispatch("save");
    },
    openPreview() {
      this.preview = true;
    },
    closePreview() {
      this.preview = false;
    }
  },
  updated() {
    this.$nextTick(() => window && window.Materialize.updateTextFields());
  }
};
</script>

<style>
.preview {
  overflow: hidden;
}
.preview-enter,
.preview-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.preview-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.preview-enter-active,
.preview-leave-active {
  transition: transform 1s, opacity 2s;
}
</style>
