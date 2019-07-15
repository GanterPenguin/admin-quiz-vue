"use strict";

import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapActions } from 'vuex';
import Layout from './layout';
import store from './store';

import QuizzesComponent from './components/quizzes';
import QuestionsComponent from './components/questions';

const routes = [
    { path: '/', component: QuizzesComponent },
    { path: '/quiz/:id', component: QuestionsComponent },
    //{ path: '/questions/:id', component: QuizComponent },
];

const router = new VueRouter({ routes });

Vue.use(VueRouter);

let el = document.querySelector('#quiz-app');

let vm = new Vue({
    store,
    router,
    data: {
        params: el.dataset,
    },
    methods: {
        ...mapActions(['init']),
    },
    created() {
        this.init(this.params)
    },
    el,
    render: h => h(Layout),
});
