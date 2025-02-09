<template>
    <div class="layout">
        <dataTable title="Inventory" :headers="tableHeaders" :data="Store.tableData"/>
    </div>
</template>

<script setup>
    import dataTable from '../components/data-table'
    import Store from '../utilities/store'

    const tableHeaders = [
        {
            display: 'Name',
            key: 'name',
            align: 'start'
        },
        {
            display: 'Type',
            key: 'type',
            align: 'start'
        },
        {
            display: 'Quantity',
            key: 'quantity',
            align: 'end'
        },
    ]
</script>
