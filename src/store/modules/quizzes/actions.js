'use strict';

export default {

    async initQuizzes(context, params) {

        let apiQuizzes = await fetch(params._links.quizzes.href);

        if(!apiQuizzes.ok) {
            throw new Error('Connection error');
        }

        let quizzes = await apiQuizzes.json();
        let quizzesPage = params._links.quizzes.href;

        context.commit('initQuizzes', { quizzes, quizzesPage });

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

    async updateQuiz(context, params) {

        let quiz = {
            id: params.id,
            title: params.title,
            creationDate: params.creationDate,
            visible: params.visible,
            sort: params.sort,
        };

        let response = await fetch(params._links.self.href, {
            method: "PUT",
            body: JSON.stringify(quiz),
        });

        if(response.ok) {
            sf.alert([{text: "Сохранено", type: "ok"}]);
        } else {
            sf.alert([{ text: "Ошибка", type: 'err' }]);
        };


    },

};
