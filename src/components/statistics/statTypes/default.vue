<script>
import { mapGetters, mapActions, mapState } from 'vuex';

export default {

    props: [
        'options',
        'question',
    ],
    components: {
    },
    data: function () {
        return {
        }
    },
    computed: {
        sum() {
            let count = 0;
            this.options.forEach(option => {
                count += option.count;
            });
            return count;
        },
    },
    methods: {
        progress(count) {
            return count / this.sum;
        }
    },
    watch: {
    },
}
</script>

<template lang="pug">

.statistics__item(v-if="options && question")

    .statistics__text {{ question._embedded.content.text }} всего ответов: {{ sum }}

        .statistics__wrapper

            .statistics__option(v-for="option in options")

                .statistics__option-text {{ option.text }}

                .statistics__progress-bar
                    q-linear-progress(style="height: 20px" :value="progress(option.count)").statistics__progress-line
                        .statistics__progress-count {{ option.count }}
</template>
