<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    props: [
        'quiz',
    ],
    components: {
    },
    methods: {
        ...mapActions('quizzes', [
            'deleteItem',
            'updateVisibility',
            'updateSort',
            'updateTitle',
        ]),
        async changeVisibility(visibility) {
            let link = this.quiz._links.self.href;
            let result = await this.updateVisibility({ link: link, visibility: visibility });
            if(result) {
                this.quiz.visible = result.visible;
            }
        },
        async changeTitle(title) {
            if(title.length >= 3) {
                let link = this.quiz._links.self.href;
                let date = this.quiz.creationDate;
                let result = await this.updateTitle({ link: link, title: title, creationDate: date });
                if(result) {
                    this.quiz.title = result.title;
                    this.quiz.creationDate = result.creationDate;
                    this.editing = false;
                }
            } else {
                sf.alert([{ text: "Ошибка, заголовок должен быть не короче 3-х символов", type: 'err' }]);
            }
        },
        changeSort() {
            let id = this.quiz.id;
            let sort = this.quiz.sort;
            this.updateSort({ id: id, sort: sort });
        },

    },
    data: function () {
        return {
            deleting: false,
            editing: false,
            newTitle: '',
        }
    },
    computed: {

    },

}
</script>


<template lang="pug">

.quiz(v-bind:class="{ quiz_deleting: deleting }")

    router-link(:to="{path: 'quiz/' + quiz.id}" v-bind:class="{ quiz__title_white: deleting }").quiz__title {{ quiz.title }}

    router-link(:to="{path: 'statistics/' + quiz.id}" v-bind:class="{ quiz__title_white: deleting }").quiz__title Статистика

    input.quiz__title-input(v-if="editing" placeholder="Введите новое название" v-model="newTitle")

    .quiz__date(v-bind:class="{ quiz__date_white: deleting }") {{ quiz.creationDate }}

    input(v-model="quiz.sort" @change="changeSort()").quiz__sort

    .quiz__actions

        .quiz__visibility.quiz__visibility_on(v-if="quiz.visible =='1'" @click="changeVisibility(0)")
        .quiz__visibility.quiz__visibility_off(v-else @click="changeVisibility(1)")
        .quiz__edit(@click="editing=true")
        .quiz__delete(@click="deleting=true")

        .quiz__delete-form(v-if="deleting")

            .quiz__delete.quiz__delete_yes(@click="deleteItem(quiz)")

            .quiz__delete.quiz__delete_no(@click="deleting=false")

        .quiz__edit-form(v-if="editing")

            .quiz__edit.quiz__edit_yes(@click="changeTitle(newTitle)")

            .quiz__edit.quiz__edit_no(@click="editing=false")


</template>
