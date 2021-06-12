<template>
    <div>
        <div>{{ turn }}님의 턴입니다.</div>
        <table-component :table-data="tableData" />
        <div v-if="winner">{{ winner }}님의 승리입니다.</div>
    </div>
</template>

<script>
import TableComponent from './TableComponent';

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