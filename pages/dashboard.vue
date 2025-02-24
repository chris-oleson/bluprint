<template>
<div class="dashboard">
    <div class="row">
        <div class="column">
            <actions-table title="Actions Table" :headers="tableHeaders" :data="tableData" :items-per-page="5"/>
            <display-table title="Display Table" :headers="tableHeaders" :data="tableData" :items-per-page="5"/>
        </div>
        <div class="column">
            <example-form/>
        </div>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Dashboard - bluprint' })
definePageMeta({
    middleware: 'require-authentication',
    layout: 'app-layout',
})

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

const tableData = [
    {
        id: 1,
        name: 'Apples',
        type: 'Fruit',
        quantity: 4
    },
    {
        id: 2,
        name: 'Bananas',
        type: 'Fruit',
        quantity: 23
    },
    {
        id: 7,
        name: 'Pancakes',
        type: 'Pastry',
        quantity: 14
    },
    {
        id: 4,
        name: 'Onions',
        type: 'Vegetable',
        quantity: 7
    },
]
</script>
