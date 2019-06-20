<script>
    import { mapGetters, mapActions, mapState } from 'vuex';
    import Pager from './pager';
    import Quiz from './quiz';

export default {

    components: {
        'pager': Pager,
        'quiz': Quiz,
    },
    methods: {
        ...mapActions([
        ]),

    },
    data: function () {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'getQuizzes',
        ]),
        quizzes() {
            return this.getQuizzes();
        }

    },

}
</script>


<template lang="pug">

.quiz-app 

    quiz(v-for="quiz in quizzes" 
        v-bind:key="quiz.id"
        :title="quiz.title" 
        :creationDate="quiz.creationDate"
        :visible="quiz.visible"
        :sort="quiz.sort")

    pager
</template>

<style lang="scss">
@import "./src/scss/main.scss";
</style>
