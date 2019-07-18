"use strict";

export default {
    getQuizzes(state, getters) {
        return _ => {
            try {
                return state.quizzes._embedded.items;
            } catch(e) {
                return [];
            }
        };
    },
    getQuestions(state, getters) {
        return _ => {
            try {
                return state.questions._embedded.items;
            } catch(e) {
                return undefined;
            }
        };
    },
    getAnswers(state, getters) {
        return _ => {
            try {
                return state.answers._embedded.items;
            } catch(e) {
                return [];
            }
        };
    },
};
