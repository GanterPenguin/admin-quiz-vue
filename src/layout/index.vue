<script>
    import { mapGetters, mapActions, mapState } from 'vuex';
    import User from './user';
    import Pager from './pager';

export default {

    components: {
        'user': User,
        'pager': Pager,
    },
    methods: {
        ...mapActions([
        ]),

    },
    data: function () {
        return {
        }
    },
    computed: {
        ...mapGetters([
            'getGroups',
            'getChains',
            'getUsers'
        ]),
        users() {
            return this.getUsers();
        },
        groups() {
            return this.getGroups();
        },
        chains() {
            return this.getChains();
        },
    },

}
</script>


<template lang="pug">

.users 

    .table.box

        .header
            .zelle.inline-m
                a(href="#") Телефон
            .zelle.inline-m
                a(href="#") Фамилия
            .zelle.inline-m
                a(href="#") Имя
            .zelle.inline-m
                a(href="#") Отчество
            .zelle.inline-m
                a(href="#") email

        user(v-for="user in users" v-bind:key="user.id" :userId="user.id" :user="user" :groupsProp="groups" :chainsProp="chains")
        
        pager
</template>

