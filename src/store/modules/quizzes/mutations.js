'use strict';

export default {
    initQuizzes(state, data) {
        state.quizzes = data.quizzes;
        state.quizzesPage = data.quizzesPage;
        state.initialized = true;
    },
    changePage(state, data) {
        state.quizzes = data.quizzes;
        state.quizzesPage = data.link;
    },
};
