<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Question from './questionComponent';
import Pager from './pagerQuestions';

export default {

    components: {
        'question': Question,
        'pager': Pager,
    },
    methods: {
        ...mapActions([
            'setQuestions'
        ]),

    },
    data: function () {
        return {
            questionsBuf: [],
        }
    },
    computed: {
        ...mapState({
            questions: state => state.questions,
        }),
        id() {
            return this.$route.params.id;
        }
    },
    created() {
        this.setQuestions( { id: this.$route.params.id } );
    },

}
</script>


<template lang="pug">

.questions(v-if="questions")
    
    router-link(:to="{path: '/'}").quiz-title Вернуться к опросам

    h1.quiz-title Вопросы  # {{id}}

    question(v-for="question in questions._embedded.items" :key="question.id" :question="question") 

    pager(:id="id")

</template>

