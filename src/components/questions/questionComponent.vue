<script>
import { mapGetters, mapActions, mapState } from 'vuex';
import Option from './option';

export default {

    components: {
        'option-component': Option,
    },
    props: [
        "question",
    ],
    data: function () {
        return {
            adding: false,
            deleting: false,
            editing: false,
            optionText: '',
            newTitle: '',
        }
    },
    computed: {
        ...mapGetters([
        ]),
        content: {
            get() {
                if(this.question._embedded.content) {
                    return this.question._embedded.content;
                } else {
                    let content = {
                        text: "",
                    };
                    return content;
                }
            },
            set(value) {
                this.question._embedded.content = value;
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
                    this.patchResponse({ link: this.question._links.self.href, type: this.responseType });
                };
            },
        },
        responseOptions: {
            get() {
                if(this.question._embedded.response) {
                    if(this.question._embedded.response.options) {
                        return this.question._embedded.response.options;
                    } else {
                        return [];
                    }
                } else {
                    return [];
                };
            },
            set(value) {
                this.patchResponse({ link: this.question._links.self.href, options: this.responseOptions, type: this.responseType });
            },
        }
    },
    methods: {
        ...mapActions('questions', [
            'deleteQuestion',
            'patchResponse',
            'patchContent',
            'updateVisibility',
            'updateSort',
        ]),
        addOption(text) {
            if(text.length > 3) {
                let optionsTemp = this.responseOptions;
                optionsTemp.push(text);
                this.responseOptions = optionsTemp;
                this.optionText = '';
            } else {
                sf.alert([{ text: "Ошибка, текст вопроса должен быть не короче 3-х символов", type: 'err' }]);
            }
        },
        removeOption(index) {
            let optionsTemp = this.responseOptions;
            optionsTemp.splice(index, 1);
            this.responseOptions = optionsTemp;
        },
        async changeVisibility(visibility) {
            let link = this.question._links.self.href;
            let result = await this.updateVisibility({ link: link, visibility: visibility });
            this.question.visible = result.visible;
        },
        changeSort() {
            let id = this.question.id;
            let quiz_id = this.question.quiz_id;
            let sort = this.question.sort;
            this.updateSort({ id: id, quiz_id: quiz_id, sort: sort });
        },
        async changeContent() {
            if(this.newTitle.length >= 3) {
                let result = await this.patchContent({ link: this.question._links.self.href, text: this.newTitle });
                this.editing = false;
                this.content = result;
            } else {
                sf.alert([{ text: "Ошибка, текст вопроса должен быть не короче 3-х символов", type: 'err' }]);
            }
        },
    },

}
</script>


<template lang="pug">

.question-wrapper

    .question(v-bind:class="{ question_deleting: deleting }")

        .question__title(v-bind:class="{ question__title_white: deleting }") {{ content.text }}

        input.question__title-input(v-if="editing" placeholder="Введите новый текст вопроса" v-model="newTitle")

        .question__date(v-bind:class="{ question__date_white: deleting }")

        input(v-model="question.sort" @change="changeSort()").question__sort

        .question__actions

            .question__add(@click="adding=!adding")

            .question__visibility.question__visibility_on(v-if="question.visible =='1'" @click="changeVisibility(0)")
            .question__visibility.question__visibility_off(v-else @click="changeVisibility(1)")
            .question__edit(@click="editing=true")
            .question__delete(@click="deleting=true")

            .question__delete-form(v-if="deleting")

                .question__delete.question__delete_yes(@click="deleteQuestion(question)")

                .question__delete.question__delete_no(@click="deleting=false")

            .question__edit-form(v-if="editing")

                .question__edit.question__edit_yes(@click="changeContent")

                .question__edit.question__edit_no(@click="editing=false")


    .add-form(v-if="adding")

        .add-form__head

            .add-form__title Добавить варианты ответов

            select(name="responseType" v-model="responseType" autocomplete="off")
                option(value="radio" selected) Один вариант ответа
                option(value="checkbox") Несколько вариантов ответа
                option(value="radioFree") Один вариант ответа + свободный
                option(value="checkboxFree") Несколько вариантов ответа + свободный

        .add-form__title Варианты ответов:

        .add-form__options(v-if="responseOptions")

            option-component(v-for="(value, option, index) in responseOptions" :key="index", :text="value", :option="option" v-on:option-remove="removeOption")

        input(type="text" v-model="optionText").add-form__input
        button(@click="addOption(optionText)" value="Добавить вариант ответа").add-form__button  Добавить вариант ответа

</template>
