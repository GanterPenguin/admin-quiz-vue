"use strict";

export default {
    
    init(state, data) {
        state.quizzes = data.quizzes;
        state.questions = data.questions;
        state.answers = data.answers;
    },
    changePage(state, quizzes) {
        state.quizzes = quizzes;
    }
}
