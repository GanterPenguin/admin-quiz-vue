"use strict";

export default {
    
    init(state, data) {
        state.quizzes = data.quizzes;
        state.quizzesPage = data.quizzesPage;
        state.initialized = true;
    },
    setQuestions(state, data) {
        state.questions = data.questions;
        state.questionsPage = data.link;
    },
    changePage(state, data) {
        state.quizzes = data.quizzes;
        state.quizzesPage = data.link;
    },
    appendQuiz(state, quiz) {
        state.quizzes._embedded.items.push(quiz);
    },
    deleteQuiz(state, id) {
        let index = state.quizzes._embedded.items.map(item => item.id).indexOf(id);
        state.quizzes._embedded.items.splice(index, 1);
    },
    deleteQuestion(state, id) {
        let index = state.questions._embedded.items.map(item => item.id).indexOf(id);
        state.questions._embedded.items.splice(index, 1);
    },
}
