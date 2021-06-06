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
            // this.$root.$data : 최상위 부모의 데이터에 접근
            // this.$parent.$data : 바로 위 부모의 데이터에 접근
            console.log(this.$root.$data);
            console.log(this.$parent.$data);

            // 부모 데이터에 접근해서 턴의 변환을 최하위 자식 컴포넌트에서 조작
            this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O';
        }
    }
}
</script>

<style>

</style>