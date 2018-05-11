<template>
    <div>
        <fieldset class="col s12">
            <legend>Ingredients</legend>
            <div v-for="(ingredient, idx) in ingredients" :key="idx">
                <div class="row">
                    <div class="input-field col s6 m3">
                        <input :name="`ing-${idx}-qty`" v-model="ingredient.qty" placeholder="qty?" type="text">
                    </div>
                    <div class="input-field col s6 m3">
                        <input :name="`ing-${idx}-unit`" v-model="ingredient.unit" placeholder="Units?"
                            type="text">
                    </div>
                    <div class="input-field col s6 m3 center-align">
                        <input :id="`ing-${idx}-opt`" :name="`ing-${idx}-opt`" v-model="ingredient.optional"
                            placeholder="optional?" type="checkbox">
                        <label :for="`ing-${idx}-opt`">Optional?</label>
                    </div>
                    <div class="input-field col s6 m3 center-align">
                        <button class="btn-flat btn-sm red-text" type="button" @click="deleteItem('ingredients', idx)">
                            <i class="material-icons">delete</i>
                        </button>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12 m6">
                        <input :name="`ing-${idx}-name`" v-model="ingredient.name" placeholder="Name?" type="text">
                    </div>
                    <div class="input-field col s12 m6">
                        <input :name="`ing-${idx}-prep`" v-model="ingredient.preparation" placeholder="Preparation?"
                            type="text">
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col s6 center-align">
                    <button class="btn btn-sm grey lighten-5" type="button" @click="addItem('ingredients:group')"
                        title="Adds an Ingredients Group">
                        <i class="material-icons left">add</i> Group
                    </button>
                </div>
                <div class="col s6 center-align">
                    <button class="btn btn-sm grey lighten-5" type="button" @click="addItem('ingredients')"
                        title="adds an Ingredient to a group">
                        <i class="material-icons left">add</i> Ingredient
                    </button>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>

</style>