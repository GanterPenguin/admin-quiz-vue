<script>
    import { mapGetters, mapActions, mapState } from 'vuex';
import Pager from './components/pager';

export default {

    components: {
        'pager': Pager,
    },
    methods: {
        ...mapActions([
            'init',
        ]),

    },
    data: function () {
        return {
        }
    },
    computed: {
        ...mapState({
            initialized: state => state.initialized,
        }),
    },
    created() {
        if(!this.initialized) {
            this.init(this.$root.params);
        }
    },

}
</script>


<template lang="pug">

.quiz-app(v-if="initialized") 

    router-view

</template>

<style lang="scss">
@import "./src/scss/main.scss";
</style>
