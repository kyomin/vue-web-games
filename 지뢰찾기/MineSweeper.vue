<template>
    <div>
        <mine-form />
        <div>{{ timer }}</div>
        <table-component />
        <div>{{ result }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import store from './store';
import TableComponent from './TableComponent.vue';

export default {
    store,
    components: {
        TableComponent
    },
    computed: {
        ...mapState(['timer', 'result'])
    },
    methods: {

    }
}
</script>

<style>

</style>