<script>
    import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    props: [
        'quiz',
    ],
    components: {
    },
    methods: {
        ...mapActions('quizzes', [
            'deleteItem',
            'updateVisibility',
            'updateSort',
        ]),
        changeVisibility(visibility) {
            let link = this.quiz._links.self.href;
            //let visibility = this.quiz.visible;
            this.updateVisibility({ link: link, visibility: visibility });
        },
        changeSort() {
            let id = this.quiz.id;
            let sort = this.quiz.sort;
            this.updateSort({ id: id, sort: sort });
        },

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

    input(v-model="quiz.sort" @change="changeSort()").quiz__sort

    .quiz__actions

        .quiz__visibility.quiz__visibility_on(v-if="quiz.visible==='1'" @click="changeVisibility(1)")
        .quiz__visibility.quiz__visibility_off(v-else @click="changeVisibility(0)")

        .quiz__delete(@click="deleting=true")

        .quiz__delete-form(v-if="deleting")

            .quiz__delete.quiz__delete_yes(@click="deleteItem(quiz)")

            .quiz__delete.quiz__delete_no(@click="deleting=false")

</template>

<style lang="scss">
@import "./src/scss/main.scss";
</style>
