<script>    import { mapGetters, mapActions, mapState } from 'vuex';
    import Pager from './pager';
    import Quiz from './quizComponent';

export default {

    components: {
        'pager': Pager,
        'quiz': Quiz,
    },
    data: function () {
        return {
            quizTitle: '',
        }
    },
    methods: {
        ...mapActions([
            'appendQuiz'
        ]),
        send(title) {
            if(title.length>0) {
                this.appendQuiz(title);
                this.quizTitle = '';
            }
        },

    },
    computed: {
        ...mapState({
            quizzes: state => state.quizzes,
            quizzesPage: state => state.quizzesPage,
        }),

    },

}
</script>


<template lang="pug">

.quiz-main(v-if="quizzes")

    h1.quiz-title Опросы

    input(v-model="quizTitle" placeholder="Новый опрос")
    button(@click="send(quizTitle)") Добавить

    quiz(v-for="quiz in quizzes._embedded.items" v-bind:key="quiz.id" :quiz="quiz")

    pager

</template>

<style lang="scss">
@import "./src/scss/main.scss";
</style>
