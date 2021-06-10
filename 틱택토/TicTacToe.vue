<template>
    <div>
        <div>{{ turn }}님의 턴입니다.</div>
        <table-component :table-data="tableData" />
        <div v-if="winner">{{ winner }}님의 승리입니다.</div>
    </div>
</template>

<script>
import TableComponent from './TableComponent';
import EventBus from './EventBus';

export default {
    components: {
        TableComponent
    },
    data() {
        return {
            tableData: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ],
            turn: 'O',
            winner: ''
        };
    },
    methods: {
        onClickTd(rowIndex, cellIndex) {
            this.$set(this.tableData[rowIndex], cellIndex, this.turn);

            // 클릭했을 때, 가로, 세로, 대각선 2개가 3목이 됐는지 판단하는 로직
            let win = false;
            if (this.tableData[rowIndex][0] === this.turn && this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn) 
                win = true;
            
            if (this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn)
                win = true;

            if (this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn)
                win = true;

            if (this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn)
                win = true;
            
            // 이긴 경우 3줄 달성!
            if (win) {
                // 승자 기록
                this.winner = this.turn;

                // 데이터 초기화
                this.turn = 'O';
                this.tableData = [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ];
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
                    this.winner = '';
                    this.turn = 'O';
                    this.tableData = [
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', '']
                    ];
                } else {    // 아직 게임이 끝나지 않은 경우 턴 바꿔주기
                    this.turn = this.turn === 'O' ? 'X' : 'O';
                }
            }
        }
    },
    created() {
        // custom 이벤트를 등록할 수 있다.
        // 특정 컴포넌트에서 clickTd로 이벤트를 emit하는 순간 받는다.
        EventBus.$on('clickTd', this.onClickTd);
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