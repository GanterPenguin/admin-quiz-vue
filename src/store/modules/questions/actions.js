'use strict';

export default {

    async setQuestions(context, params) {
        if(params.link){
            let link = `${params.link}/${params.id}/questions`;
        } else {
            let link = `${context.rootState.apiData._links.self.href}/${params.id}/questions`;
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

};
