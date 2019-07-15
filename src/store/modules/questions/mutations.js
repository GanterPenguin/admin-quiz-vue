'use strict';

export default {

    setQuestions(state, data) {
        state.questions = data.questions;
        state.questionsPage = data.link;
    },

    deleteQuestion(state, id) {
        let index = state.questions._embedded.items.map(item => item.id).indexOf(id);
        state.questions._embedded.items.splice(index, 1);
    },

};
