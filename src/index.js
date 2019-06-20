"use strict";

import Vue from 'vue';
import { mapActions } from 'vuex';
import Layout from './layout';
import store from './store';

let el = document.querySelector('#quiz-app');

let vm = new Vue({
    store,
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
