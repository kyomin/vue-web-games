<template>
    <td v-on:click="onClickTd">{{ cellData }}</td>
</template>

<script>
export default {
    props: {
        cellData: String,
        rowIndex: Number,
        cellIndex: Number
    },
    methods: {
        onClickTd() {
            const rootData = this.$root.$data;

            // * 주의 : 인덱스를 사용해 배열에 접근해서 데이터를 바꾸면, 화면에 반영이 안 된다.
            // 이는 자바스크립트의 특성이라 뷰도 어쩔 수 없이 따르는 것이다.
            // 따라서 위의 방식이 아닌, 아래의 방식으로 바꿔줘야 한다.
            // this.$root.$data.tableData[this.rowIndex][this.cellIndex] = this.$root.$data.turn;
            if (rootData.tableData[this.rowIndex][this.cellIndex] === '') {     // 빈 칸인 경우만 유효!
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

                // 클릭했을 때, 가로, 세로, 대각선 2개가 3목이 됐는지 판단하는 로직
                let win = false;
                if (rootData.tableData[this.rowIndex][0] === rootData.turn && rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn) 
                    win = true;
                
                if (rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn)
                    win = true;

                if (rootData.tableData[0][0] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn)
                    win = true;

                if (rootData.tableData[0][2] === rootData.turn && rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn)
                    win = true;
                
                // 이긴 경우 3줄 달성!
                if (win) {
                    // 승자 기록
                    rootData.winner = rootData.turn;

                    // 데이터 초기화
                    rootData.turn = 'O';
                    rootData.tableData = [
                        ['', '', ''],
                        ['', '', ''],
                        ['', '', '']
                    ];
                } else {    // 아직 승자가 없는 경우

                    // 그런데 모든 칸이 다 차있으면 승자가 없는 무승부이다.
                    let all = true;     // all이 true면 무승부라는 뜻
                    rootData.tableData.forEach((row) => {
                        row.forEach((cell) => {
                            if (!cell) {
                                all = false;
                            }
                        });
                    });

                    // 무승부인 경우 게임 데이터 초기화
                    if (all) {
                        rootData.winner = '';
                        rootData.turn = 'O';
                        rootData.tableData = [
                            ['', '', ''],
                            ['', '', ''],
                            ['', '', '']
                        ];
                    } else {    // 아직 게임이 끝나지 않은 경우 턴 바꿔주기
                        rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                    }
                }
            }
        }
    }
}
</script>

<style>

</style>