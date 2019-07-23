<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    props: [
        'text',
        'option',
    ],
    components: {
    },
    methods: {
        ...mapActions([
        ]),
        remove() {
            this.$emit('option-remove', this.option);
            this.deletingOption = false;
        },
    },
    data: function () {
        return {
            deletingOption: false,
        }
    },
    computed: {
        ...mapState({
        }),

    },

}
</script>


<template lang="pug">

.add-form__option

    .add-form__option-title {{ text }}

    .add-form__option-actions

        .question__delete(@click="deletingOption=true")

        .question__delete-form(v-if="deletingOption")

            .question__delete.question__delete_yes(@click="remove")

            .question__delete.question__delete_no(@click="deletingOption=false")

</template>
