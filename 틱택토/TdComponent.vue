<template>
    <td v-on:click="onClickTd">{{ cellData }}</td>
</template>

<script>
import { mapState } from 'vuex';
import { CLICK_CELL, SET_WINNER, RESET_GAME, CHANGE_TURN, NO_WINNER } from './store';

export default {
    props: {
        rowIndex: Number,
        cellIndex: Number
    },
    // Vuex의 state를 쓰기 위해서는
    // computed에 반드시 연결을 해줘야 한다.
    computed: {
        // 부모로부터 물려받지 않고, 바로 접근한다.
        ...mapState({
            tableData: state => state.tableData,
            turn: state => state.turn,

            // arrow function에서는 현 scope의 this를 사용하지 못하므로
            cellData(state) {
                return state.tableData[this.rowIndex][this.cellIndex];
            }
        })
        // cellData() {
        //     return this.$store.state.tableData[this.rowIndex][this.cellIndex]
        // },
        // tableData() {
        //     return this.$store.state.tableData
        // },
        // turn() {
        //     return this.$store.state.turn
        // }
    },
    methods: {
        onClickTd() {
            // 이미 눌려진 칸이면 중단
            if (this.cellData) return;

            // this.$set(this.tableData[rowIndex], cellIndex, this.turn);
            this.$store.commit(CLICK_CELL, { row: this.rowIndex, cell: this.cellIndex });   // Vuex의 mutation은 commit을 통해 실행한다.

            // 클릭했을 때, 가로, 세로, 대각선 2개가 3목이 됐는지 판단하는 로직
            let win = false;
            if (this.tableData[this.rowIndex][0] === this.turn && this.tableData[this.rowIndex][1] === this.turn && this.tableData[this.rowIndex][2] === this.turn) 
                win = true;
            
            if (this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn && this.tableData[2][this.cellIndex] === this.turn)
                win = true;

            if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn)
                win = true;

            if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn)
                win = true;
            
            // 이긴 경우 3줄 달성!
            if (win) {
                // 승자 기록
                // this.winner = this.turn;
                this.$store.commit(SET_WINNER, this.turn);

                // 데이터 초기화
                // this.turn = 'O';
                // this.tableData = [
                //     ['', '', ''],
                //     ['', '', ''],
                //     ['', '', '']
                // ];
                this.$store.commit(RESET_GAME);
            } else {    // 아직 승자가 없는 경우

                // 그런데 모든 칸이 다 차있으면 승자가 없는 무승부이다.
                let all = true;     // all이 true면 무승부라는 뜻
                this.tableData.forEach((row) => {
                    row.forEach((cell) => {
                        if (!cell) {
                            all = false;
                        }
                    });
                });

                // 무승부인 경우 게임 데이터 초기화
                if (all) {
                    // this.winner = '';
                    this.$store.commit(NO_WINNER);

                    // this.turn = 'O';
                    // this.tableData = [
                    //     ['', '', ''],
                    //     ['', '', ''],
                    //     ['', '', '']
                    // ];
                    this.$store.commit(RESET_GAME);
                } else {    // 아직 게임이 끝나지 않은 경우 턴 바꿔주기
                    // this.turn = this.turn === 'O' ? 'X' : 'O';
                    this.$store.commit(CHANGE_TURN);
                }
            }
        }
    }
}
</script>

<style>

</style>