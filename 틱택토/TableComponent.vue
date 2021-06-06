<template>
    <table>
        <tr-component 
            v-for="(rowData, index) in tableData"
            :row-data="rowData"
            :row-index="index"
            :key="index"
        />
    </table>
</template>

<script>
import TrComponents from './TrComponents';

export default {
    props: {
        tableData: Array
    },
    components: {
        TrComponents
    }
}
</script>

<style>

</style>