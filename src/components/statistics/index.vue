<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import DefaultStat from './statTypes/default';

export default {

    components: {
        'default-stat': DefaultStat,
    },
    data: function () {
        return {
        }
    },
    methods: {
        ...mapActions('quizzes', [
            'initStatistics',
        ]),
        ...mapActions('questions', [
            'setQuestions',
        ]),
        statisticsType(type) {
            switch(type) {

                default:
                    return 'default-stat';
            };
        },
        question(id) {
            return this.questions._embedded.items.find(question => question.id === id);
        },
    },
    computed: {
        ...mapState('questions', {
            questions: state => state.questions,
        }),
        ...mapState('quizzes', {
            quizzes: state => state.quizzes,
            statistics: state => state.statistics,
        }),
        ...mapGetters('quizzes', [
            'getQuizById'
        ]),
        quiz() {
            return this.getQuizById(this.id);
        },
        id() {
            return this.$route.params.id;
        },
    },
    created() {
        this.setQuestions({ id: this.id, statistics: true });
        this.initStatistics({ id: this.id });
    },
}
</script>

<template lang="pug">

.statistics(v-if="questions")

    router-link.statistics__back(:to="{ path: '/' }") Вернуться к опросам

    .statistics__title  Статистика: {{ quiz.title }}

    .statistics__wrapper(v-if="statistics")

        .statistics-statistics

            component(v-for="(item, index) in statistics" 
                :key="index" 
                :is="statisticsType(item.type)" 
                :options="item.options" 
                :question="question(item.questionId)")
</template>
