<template>
    <table>
        <tr-component 
            v-for="(rowData, index) in tableData"
            :key="index"
            :row-index="index"
        />
    </table>
</template>

<script>
import { mapState } from 'vuex';
import TrComponent from './TrComponent';

export default {
    components: {
        TrComponent
    },
    computed: {
        ...mapState(['tableData'])
        // tableData() {
        //     return this.$store.state.tableData
        // }
    }
}
</script>

<style>

</style>