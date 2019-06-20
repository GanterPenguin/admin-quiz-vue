<script>
    import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    components: {
    },
    props: [
        "title",
        "creationDate",
        "visible",
        "sort",
    ],
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
        ]),

    },

}
</script>


<template lang="pug">

.quiz

    .quiz__title {{ title }} 

    .quiz__date {{ creationDate }} 

    input(:value="sort").quiz__sort 

    .quiz__actions

        .quiz__visibility

        .quiz__delete

        .quiz__delete-form

            .quiz__delete-yes

            .quiz__delete-no

</template>

