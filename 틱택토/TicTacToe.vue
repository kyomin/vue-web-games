<template>
    <div>
        <div>{{ turn }}님의 턴입니다.</div>
        <table-component />
        <div v-if="winner">{{ winnerMessage }}</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import store from './store';
import TableComponent from './TableComponent';

export default {
    store,
    components: {
        TableComponent
    },
    computed: {
        ...mapState({
            winner: state => state.winner,
            turn: state => state.turn,
            winnerMessage() {
                return this.$store.getters.winnerMessage;
            }
        })
        // turn() {
        //     return this.$store.state.turn
        // },
        // winner() {
        //     return this.$store.state.winner
        // }
    }
}
</script>

<style>
    table {
        border-collapse: collapse;
    }
    td {
        border: 1px solid black;
        width: 40px;
        height: 40px;
        text-align: center;
    }
</style>