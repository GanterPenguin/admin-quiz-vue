'use strict';

export default {
    
    getQuizById: (state) => (id) => {
        return state.quizzes._embedded.items.find(quiz => quiz.id === id);
    },
};
