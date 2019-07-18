'use strict';

export default {

    async setQuestions(context, params) {
        if(params.link){
            let link = `${params.link}/${params.id}/questions`;
        } else {
            let link = `${context.rootState.apiData._links.self.href}/quizzes/${params.id}/questions`;
        }

        let response = await fetch(link);

        if(!response.ok) {
            throw new Error('Connection error');
        }

        let questions = await response.json(); 
        let link = params.link;

        context.commit('setQuestions', { questions, link });

    },

    async appendQuestion(context, params) {
        let body = {
            content: {
                type: 'text',
                text: params.text,
            }
        };
        let response = await fetch(params.link, {
            method: 'POST',
            body: JSON.stringify(body),
        }); 

        if(!response.ok) {
            throw new Error('Connection error');
        }

        let id = params.quiz_id;
        let link = context.state.questionsPage;

        context.dispatch('setQuestions', { id, link });
    },

    async deleteQuestion(context, params) {
        let response = await fetch(params._links.self.href, {
            method: 'DELETE',
        });
        if(!response.ok) {
            throw new Error('Connection error');
        }
        let id = params.quiz_id;
        let link = context.state.questionsPage;

        context.dispatch('setQuestions', { id, link });
    },

    async patchResponse(context, params) {
        let patch = [];
        let link = `${params.link}/response`;
        if(params.type) {
            let bodyType = {
                op: "add",
                path: '/type',
                value: params.type,
            };
            patch.push(bodyType);
        }
        if(params.options) {
            let bodyOptions = {
                op: "add",
                path: "/options",
                value: params.options,
            };
            patch.push(bodyOptions);
        }

        let response = await fetch (link, {
            method: "PATCH",
            body: JSON.stringify(patch),
        });

        if(response.ok) {
            sf.alert([{text: "Сохранено", type: "ok"}]);
        } else {
            sf.alert([{ text: "Ошибка", type: 'err' }]);
        };

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
            sf.alert([{ text: "Ошибка", type: 'err' }]);
        };
    },

    async updateSort(context, params) {
        let link = `${context.rootState.apiData._links.self.href}/quizzes/sort`;
        let id = params.id;
        let sort = params.sort;
        let body = { id : id, sort: sort };
        let response = await fetch(link, {
            method: "PATCH",
            body: JSON.stringify(body),
        });

        if(response.ok) {
            sf.alert([{text: "Сохранено", type: "ok"}]);
            let id = params.quiz_id;

            context.dispatch('setQuestions', { id });
        } else {
            sf.alert([{ text: "Ошибка", type: 'err' }]);
        };
    },

};
