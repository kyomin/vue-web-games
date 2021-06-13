<template>
    <div>
        <input type="number" placeholder="세로" :value="row" @change="onChangeRow" />
        <input type="number" placeholder="가로" :value="cell" @change="onChangeCell" />
        <input type="number" placeholder="지뢰" :value="mine" @change="onChangeMine" />
        <button @click="onClickBtn">시작</button>
    </div>
</template>

<script>
import { START_GAME } from './store';

export default {
    // 현 컴포넌트에서만 쓸 데이터는 구지 중앙 통제실인 Vuex Store가 아닌 이 곳에서 지역적으로 선언해 쓴다.
    data() {
        return {
            row: 10,
            cell: 10,
            mine: 20
        };
    },
    methods: {
        onChangeRow(e) {
            this.row = e.target.value;
        },
        onChangeCell(e) {
            this.cell = e.target.value;
        },
        onChangeMine(e) {
            this.mine = e.target.value;
        },
        onClickBtn() {
            this.$store.commit(START_GAME, { row: this.row, cell: this.cell, mine: this.mine });
        }
    }
}
</script>

<style>

</style>