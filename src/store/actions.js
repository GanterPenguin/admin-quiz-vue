"use strict";

export default {
    
    async init(context, params) {
    
        let apiQuiz = await fetch(params.apiLink);

        if(!apiQuiz.ok) {
            throw new Error('Connection error');
        }

        let data = await apiQuiz.json();

        let apiQuizzes = await fetch(data._links.quizzes.href);

        if(!apiQuizzes.ok) {
            throw new Error('Connection error');
        }

        let quizzes = await apiQuizzes.json();
        let quizzesPage = data._links.quizzes.href;

        context.commit('init', { quizzes, quizzesPage });
    
    },

    async setQuestions(context, params) {
        if(params.link){
            let link = `${params.link}/${params.id}/questions`;
        } else {
            let link = `${context.state.quizzes._links.self.href}/${params.id}/questions`;
        }
    
        let response = await fetch(link);

        if(!response.ok) {
            throw new Error('Connection error');
        }

        let questions = await response.json(); 

        context.commit('setQuestions', { questions });
    
    },

    async changePage(context, link) {
     
        let apiQuizzes = await fetch(link);

        if(!apiQuizzes.ok) {
            throw new Error('Connection error');
        }

        let quizzes = await apiQuizzes.json();

        context.commit('changePage', {quizzes, link});
    
    },

    async appendQuiz(context, quizTitle) {
        let link = context.state.quizzes._links.self.href;
        let body = JSON.stringify({title: quizTitle});

        let response = await fetch(link, {
            method: 'POST',
            body: body,
        });
        if(!response.ok){
            throw new Error('Connection error');
        }

        let quiz = await response.json();

        context.dispatch('changePage', context.state.quizzesPage);
    }, 

    async deleteItem(context, params) {
        let response = await fetch(params._links.self.href, {
            method: 'DELETE',
        });
        if(!response.ok) {
            throw new Error('Connection error');
        }

        context.dispatch('changePage', context.state.quizzesPage);
    },

    async deleteQuestion(context, params) {
        let response = await fetch(params._links.self.href, {
            method: 'DELETE',
        });
        if(!response.ok) {
            throw new Error('Connection error');
        }

        context.commit('deleteQuestion', params.id);
    },
}
