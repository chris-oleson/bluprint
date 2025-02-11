<template>
    <div class="layout">
        <crud-table title="CRUD Table" :headers="tableHeaders" :data="Store.tableData"/>
    </div>
</template>

<script setup>
    import crudTable from '../components/crud-table'
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
