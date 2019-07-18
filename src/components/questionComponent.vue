<script>
    import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    components: {
    },
    props: [
        "question",
    ],
    methods: {
        ...mapActions('questions', [
            'deleteQuestion',
            'patchResponse',
            'updateVisibility',
            'updateSort',
        ]),
        addOption(text) {
            this.responseOptions.push(text);
            this.optionText = '';
            this.patchResponse({ link: this.question._links.self.href, options: this.responseOptions, type: this.responseType });
        },
        changeVisibility(visibility) {
            let link = this.question._links.self.href;
            //let visibility = this.question.visible;
            this.updateVisibility({ link: link, visibility: visibility });
        },
        changeSort() {
            let id = this.question.id;
            let sort = this.question.sort;
            this.updateSort({ id: id, sort: sort });
        },
    },
    data: function () {
        return {
            adding: false,
            deleting: false,
            optionText: '',
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
        responseType: {
            get() {
                let object = this.question._embedded.response;
                if(object && object.type) {
                    return object.type;
                } else {
                    return "radio";
                };
            },
            set(value) {
                if(this.question._embedded.response) {
                    this.question._embedded.response.type = value;
                    this.patchResponse({ link: this.question._links.self.href, type: this.responseType });
                } else {
                    this.question._embedded.response = {
                        type: value,
                        options: [],
                    };
                };
            },
        },
        responseOptions: {
            get() {
                if(this.question._embedded.response) {
                    return this.question._embedded.response.options;
                } else {
                    return [];
                };
            },
        }
    }

}
</script>


<template lang="pug">

.question-wrapper

    .question(v-bind:class="{ question_deleting: deleting }")

        .question__title(v-bind:class="{ question__title_white: deleting }") {{ content.text }}

        .question__date(v-bind:class="{ question__date_white: deleting }")

        input(v-model="question.sort" @change="changeSort()").question__sort

        .question__actions

            .question__add(@click="adding=!adding")

            .question__visibility.question__visibility_on(v-if="question.visible==='1'" @click="changeVisibility(1)")
            .question__visibility.question__visibility_off(v-else @click="changeVisibility(0)")

            .question__delete(@click="deleting=true")

            .question__delete-form(v-if="deleting")

                .question__delete.question__delete_yes(@click="deleteQuestion(question)")

                .question__delete.question__delete_no(@click="deleting=false")

    .add-form(v-if="adding")

        .add-form__head

            .add-form__title Добавить варианты ответов

            select(name="responseType" v-model="responseType" autocomplete="off")
                option(value="radio" selected) Один вариант ответа
                option(value="checkbox") Несколько вариантов ответа
                option(value="radioFree") Один вариант ответа + свободный
                option(value="checkboxFree") Несколько вариантов ответа + свободный

        .add-form__options 

            .add-form__option(v-for="option in responseOptions") {{option}}

        input(type="text" v-model="optionText").add-form__input
        button(@click="addOption(optionText)").add-form__button Добавить вариант ответа

</template>

