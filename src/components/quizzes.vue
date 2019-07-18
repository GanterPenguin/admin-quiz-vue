<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Pager from './pagerQuizzes';
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
        ...mapActions('quizzes', [
            'initQuizzes',
            'appendQuiz',
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
            apiData: state => state.apiData,
        }),
        ...mapState('quizzes', {
            quizzes: state => state.quizzes,
            quizzesPage: state => state.quizzesPage,
        }),
    },
    watch: {
        apiData (newVal, oldVal) {
            if(newVal && !quizzes) {
                this.initQuizzes(newVal);
            }
        }
    },

}
</script>


<template lang="pug">

.quiz-wrapper

    .quiz-main(v-if="quizzes")

        h1.quiz-title Опросы

        input(v-model="quizTitle" placeholder="Новый опрос")
        button(@click="send(quizTitle)") Добавить

        quiz(v-for="quiz in quizzes._embedded.items" v-bind:key="quiz.id" :quiz="quiz")

        pager

    .quiz-main__loading(v-else="quizzes") Загрузка...

</template>

<style lang="scss">
@import "./src/scss/main.scss";
</style>
