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
            adding: false,
            deleting: false,
            responseType: '',
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

.question-wrapper

    .question(v-bind:class="{ question_deleting: deleting }")

        .question__title(v-bind:class="{ question__title_white: deleting }") {{ content.text }}

        .question__date(v-bind:class="{ question__date_white: deleting }")  

        input.question__sort(:value="question.sort") 

        .question__actions

            .question__add(@click="adding=!adding")

            .question__visibility {{ question.visible }}

            .question__delete(@click="deleting=true")

            .question__delete-form(v-if="deleting")

                .question__delete.question__delete_yes(@click="deleteQuestion(question)")

                .question__delete.question__delete_no(@click="deleting=false")

    .add-form(v-if="adding")

        .add-form__head

            .add-form__title Добавить варианты ответов

            select(name="responseType" v-model="responseType" autocomplete="off")
                option(value="" selected) Выберите тип ответов
                option(value="radio") Один вариант ответа
                option(value="checkbox") Несколько вариантов ответа
                option(value="radioFree") Один вариант ответа + свободный
                option(value="checkboxFree") Несколько вариантов ответа + свободный

        .add-form__options 

            .add-form__option Вариант 1

        input(type="text").add-form__input
        button().add-form__button Добавить вариант ответа

</template>

