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
        async initApi() {
            if(!this.initializedApi) {
                let data = await this.init(this.$root.params);
                this.initQuizzes(data);
            }
        }
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
    created() {
        this.initApi();
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
