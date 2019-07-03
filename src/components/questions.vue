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
        }
    },
    computed: {
        ...mapState({
            questions: state => state.questions,
        }),
        id() {
            return this.$route.params.id;
        },
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

    input(v-model="questionText" placeholder="Новый вопрос")
    button(@click="send({text: questionText, link: questions._links.self.href, quiz_id: id})") Добавить

    question(v-for="question in questions._embedded.items" :key="question.id" :question="question") 

    pager(:id="id")

</template>

