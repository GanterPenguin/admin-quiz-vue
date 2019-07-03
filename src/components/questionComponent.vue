<script>
    import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    components: {
    },
    props: [
        "question",
    ],
    methods: {
        ...mapActions([
            'deleteQuestion'
        ]),

    },
    data: function () {
        return {
            deleting: false,
        }
    },
    computed: {
        ...mapGetters([
        ]),
        content() {
            if(this.question._embedded.content) {
                return this.question._embedded.content;
            } else {
                let content = {
                    text: "",
                };
                return content;
            }
        },
    }

}
</script>


<template lang="pug">

.quiz(v-bind:class="{ quiz_deleting: deleting }")

    .quiz__title(v-bind:class="{ quiz__title_white: deleting }") {{ content.text }}

    .quiz__date(v-bind:class="{ quiz__date_white: deleting }")  

    input.quiz__sort(:value="question.sort") 

    .quiz__actions

        .quiz__visibility {{ question.visible }}

        .quiz__delete(@click="deleting=true")

        .quiz__delete-form(v-if="deleting")

            .quiz__delete.quiz__delete_yes(@click="deleteQuestion(question)")

            .quiz__delete.quiz__delete_no(@click="deleting=false")

</template>

