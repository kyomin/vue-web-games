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
            this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
            rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
        }
    }
}
</script>

<style>

</style>