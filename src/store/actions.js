"use strict";

export default {
    
    async init(context, params) {
    
        let apiQuiz = await fetch(params.apiLink);

        if(!apiQuiz.ok) {
            throw new Error('Connection error');
        }

        let data = await apiQuiz.json();

        let apiQuizzes = await fetch(data._links.quizzes.href);
        let apiQuestions = await fetch(data._links.questions.href);
        let apiAnswers = await fetch(data._links.answers.href);

        if(!apiQuizzes.ok && !apiQuestions.ok && !apiAnswers.ok) {
            throw new Error('Connection error');
        }

        let quizzes = await apiQuizzes.json();
        let questions = await apiQuestions.json();
        let answers = await apiAnswers.json();

        context.commit('init', { quizzes, questions, answers });
    
    },

    async changePage(context, link) {
     
        let apiQuizzes = await fetch(link);

        if(!apiQuizzes.ok) {
            throw new Error('Connection error');
        }

        let quizzes = await apiQuizzes.json();

        context.commit('changePage', quizzes);
    
    },

}
