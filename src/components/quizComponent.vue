<script>
    import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    props: [
        'quiz',
    ],
    components: {
    },
    methods: {
        ...mapActions([
            'deleteItem'
        ]),

    },
    data: function () {
        return {
            deleting: false,
        }
    },
    computed: {

    },

}
</script>


<template lang="pug">

.quiz(v-bind:class="{ quiz_deleting: deleting }")

    router-link(:to="{path: 'quiz/' + quiz.id}" v-bind:class="{ quiz__title_white: deleting }").quiz__title {{ quiz.title }}
        
    .quiz__date(v-bind:class="{ quiz__date_white: deleting }") {{ quiz.creationDate }}

    input(:value="quiz.sort").quiz__sort  

    .quiz__actions

        .quiz__visibility {{ quiz.visible }}

        .quiz__delete(@click="deleting=true")

        .quiz__delete-form(v-if="deleting")

            .quiz__delete.quiz__delete_yes(@click="deleteItem(quiz)")

            .quiz__delete.quiz__delete_no(@click="deleting=false")

</template>

<style lang="scss">
@import "./src/scss/main.scss";
</style>
