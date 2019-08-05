'use strict';

export default {
    initQuizzes(state, data) {
        state.quizzes = data.quizzes;
        state.quizzesPage = data.quizzesPage;
        state.initialized = true;
    },
    initStatistics(state, data) {
        state.statistics = data._embedded.statistics;
    },
    changePage(state, data) {
        state.quizzes = data.quizzes;
        state.quizzesPage = data.link;
    },
};
