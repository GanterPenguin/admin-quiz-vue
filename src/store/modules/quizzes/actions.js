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

    async initStatistics(context, params) {
        let link = `${context.state.quizzes._links.self.href}/${params.id}/response`;
        let response = await fetch(link);
        if(!response.ok) {
            throw new Error("Connection error");
        }
        let statisticsData = await response.json();

        context.commit("initStatistics", statisticsData);
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

        await context.dispatch('resort');
        await context.dispatch('changePage', context.state.quizzesPage);
    },

    async updateVisibility(context, params) {
        let visibility = params.visibility;
        let body = { "visible" : visibility };
        let response = await fetch(`${params.link}/visible`, {
            method: "PUT",
            body: JSON.stringify(body),
        });

        if(response.ok) {
            sf.alert([{text: "Сохранено", type: "ok"}]);
            let result = await response.json();
            return result;
        } else {
            sf.alert([{ text: "Ошибка, повторите попытку позже.", type: 'err' }]);
        };
    },

    async updateSort(context, params) {
        let link = context.state.quizzes._links.self.href;
        let id = params.id;
        let sort = params.sort;
        let body = { id : id, sort: sort };
        let response = await fetch(`${link}/sort`, {
            method: "PATCH",
            body: JSON.stringify(body),
        });
        if(response.ok) {
            sf.alert([{text: "Сохранено", type: "ok"}]);
            context.dispatch('changePage', context.state.quizzesPage);
        } else {
            sf.alert([{ text: "Ошибка, повторите попытку позже.", type: 'err' }]);
        };
    },

    async updateTitle(context, params) {
        let title = params.title;
        let creationDate = params.creationDate;
        let body = { 
            "title" : title,
            "creationDate": creationDate,

        };
        let response = await fetch(`${params.link}`, {
            method: "PUT",
            body: JSON.stringify(body),
        });

        if(response.ok) {
            sf.alert([{text: "Сохранено", type: "ok"}]);
            let result = await response.json();
            return result;
        } else {
            sf.alert([{ text: "Ошибка, повторите попытку позже.", type: 'err' }]);
        };
    },

    async resort(context, params) {
        let link = context.state.quizzes._links.self.href;
        let response = await fetch(`${link}/resort`, {
            method: "PATCH",
        });
        if(response.ok) {
            //sf.alert([{text: "Сохранено", type: "ok"}]);
        } else {
            //sf.alert([{ text: "Ошибка", type: 'err' }]);
        };
    },

};
