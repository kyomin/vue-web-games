<template>
    <tr>
        <td-component 
            v-for="(cellData, index) in rowData"
            :key="index"
            :row-index="rowIndex"
            :cell-data="cellData"
            :cell-index="index"
        />
    </tr>
</template>

<script>
import TdComponent from './TdComponent';

export default {
    props: {
        rowData: Array,
        rowIndex: Number
    },
    components: {
        TdComponent
    }
}
</script>

<style>

</style>