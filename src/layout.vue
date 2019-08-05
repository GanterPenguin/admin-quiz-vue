<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    components: {
    },
    methods: {
        ...mapActions([
            'init',
        ]),
        ...mapActions('quizzes', [
            'initQuizzes',
        ]),

    },
    data: function () {
        return {
        }
    },
    computed: {
        ...mapState({
            initializedApi: state => state.initialized,
            apiData: state => state.apiData,
        }),
        ...mapState('quizzes', {
            initializedQuizzes: state => state.initialized,
        }),

    },
    watch: {
        apiData(newVal, oldVal) {
            if(!this.initializedQuizzes) {
                this.initQuizzes(newVal);
            }
        },
    },
    created() {
        if(!this.initializedApi) {
            this.init(this.$root.params);
        }
    },

}
</script>


<template lang="pug">

.quiz-app(v-if="initializedApi && initializedQuizzes") 

    router-view

</template>

<style lang="scss">
@import "../node_modules/quasar/dist/quasar.min.css";
@import "./src/scss/main.scss";
</style>
