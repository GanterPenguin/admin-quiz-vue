"use strict";

import Vue from 'vue';
import VueRouter from 'vue-router';
import { mapActions } from 'vuex';
import Quasar, { QLinearProgress } from 'quasar';
import Layout from './layout';
import store from './store';

import QuizzesComponent from './components/quizzes/quizzes';
import QuestionsComponent from './components/questions/questions';
import Statistics from "./components/statistics";

const routes = [
    { path: '/', component: QuizzesComponent },
    { path: '/quiz/:id', component: QuestionsComponent },
    { path: '/statistics/:id', component: Statistics },
];

const router = new VueRouter({ routes });

Vue.use(VueRouter);

Vue.use(Quasar, {
    components: {
        QLinearProgress
    }
});

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
        //this.init(this.params)
    },
    el,
    render: h => h(Layout),
});
