<script>

import { mapState, mapGetters, mapActions } from 'vuex';

export default {

    props: [
        "id",
    ],
    computed: {
        ...mapState('questions', {
            limit: state => {
                try {
                    return state.questions.limit;
                } catch(e) {
                    return undefined;
                }
            },
            offset: state => {
                try {
                    return state.questions.offset;
                } catch(e) {
                    return undefined;
                }
            },
            linkPrev: state => {
                try {
                    return state.questions._links.prev.href;
                } catch(e) {
                    return undefined;
                }
            },
            linkNext: state => {
                try {
                    return state.questions._links.next.href;
                } catch(e) {
                    return undefined;
                }
            },
        }),
        page() {
            return Math.floor(this.offset / Math.max(1, this.limit)) + 1;
        }
    },
    methods: {
        ...mapActions('questions', [
            'setQuestions',
        ]),
        setPage(href) {
            this.setQuestions({link: href, id: this.id});
            window.scrollTo(0,0);
        },
    },
}

</script>

<template>
    <div class='pager'>

        <div v-if='linkPrev !== undefined' class='container' @click='setPage(linkPrev)'>
            <div class='page'>◄</div>
        </div>

        <div class='container'>
            <div class='page active'>{{ page }}</div>
        </div>

        <div v-if='linkNext' class='container' @click='setPage(linkNext)'>
            <div class='page'>►</div>
        </div>

    </div>
</template>

<style lang='scss' scoped>

    .pager {
        display: inline-flex;
        background-color: #FFF;
        border-radius: 5px;
        border: 1px solid #ECECEC;
    }

    .container {
        width: 40px;
        height: 40px;
    }

    .page {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        text-align: center;
        color: #5D5D62;
        padding: 10px 0;
        text-decoration: none;
        border-right: 1px solid #ECECEC;
        font-weight: bold;
        background-color: rgba(0, 0, 0, 0);
    }

    .active {
        background-color: #BBB;
        color: #FFF;
    }

</style>
