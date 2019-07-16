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
        ...mapActions('questions', [
            'setQuestions',
            'appendQuestion',
        ]),
        send(object){
            if(object.text.length>0){
                this.appendQuestion(object);
                this.questionText = '';
            }
        },

    },
    data: function () {
        return {
            questionText: '',
            questionType: 'radio',
        }
    },
    computed: {
        ...mapState('questions', {
            questions: state => state.questions,
        }),
        ...mapState('quizzes', {
            quizzes: state => state.quizzes,
        }),
        id() {
            return this.$route.params.id;
        },
    },
    created() {
        if(this.quizzes) {
            this.setQuestions( { id: this.$route.params.id } );
        }
    },
    watch: {
        quizzes(newVal, oldVal) {
            if(newVal) {
                this.setQuestions( { id: this.$route.params.id } );
            }
        },
    },

}
</script>


<template lang="pug">

.questions-wrapper

    .questions(v-if="questions")

        router-link(:to="{path: '/'}").quiz-title Вернуться к опросам

        h1.quiz-title Вопросы  # {{id}}

        .questions-form
            input(v-model="questionText" name="questionText" placeholder="Новый вопрос").questions-form__input
            button(@click="send({text: questionText, link: questions._links.self.href, quiz_id: id, type: questionType})").questions-form__submit Добавить

        question(v-for="question in questions._embedded.items" :key="question.id" :question="question") 

        pager(:id="id")

    .questions__loading(v-else="questions") Загрузка...
</template>
