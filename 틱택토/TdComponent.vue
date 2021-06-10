<template>
    <td v-on:click="onClickTd">{{ cellData }}</td>
</template>

<script>
import EventBus from './EventBus';

export default {
    props: {
        cellData: String,
        rowIndex: Number,
        cellIndex: Number
    },
    methods: {
        onClickTd() {
            // 이미 눌려진 칸이면 중단
            if (this.cellData) return;

            // 이벤트 emit!
            EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
        }
    }
}
</script>

<style>

</style>