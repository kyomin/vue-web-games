<template>
    <tr>
        <td-component 
            v-for="(cellData, index) in rowData"
            :key="index"
            :row-index="rowIndex"
            :cell-index="index"
        />
    </tr>
</template>

<script>
import { mapState } from 'vuex';
import TdComponent from './TdComponent';

export default {
    props: {
        rowIndex: Number
    },
    components: {
        TdComponent
    },
    computed: {
        ...mapState({
            rowData(state) {
                return state.tableData[this.rowIndex];
            }
        })
        // rowData() {
        //     return this.$store.state.tableData[this.rowIndex]
        // }
    }
}
</script>

<style>

</style>