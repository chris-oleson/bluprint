<template>
    <div class="card">
        <h1 class="title">{{ title }}</h1>

        <template v-if="data && data.length">
            <table>
                <thead>
                    <tr>
                        <th v-for="(header, i) in headers" :key="i" :style="'text-align:' + header.align">{{ header.display }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in pageData" :key="i">
                        <td v-for="(header, j) in headers" :key="j" :style="'text-align:' + header.align">{{ item[header.key] }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="table-footer">
                <button class="simple icon button" :class="{'disabled': page == 1}" @click="page--">
                    <Icon name="ic:baseline-arrow-left"/>
                </button>
                <div>Page {{ page }} of {{ pageCount }}</div>
                <button class="simple icon button" :class="{'disabled': page == pageCount}" @click="page++">
                    <Icon name="ic:baseline-arrow-right"/>
                </button>
            </div>
        </template>

        <template v-else>
            <div class="horizontal divider"></div>
            <div style="padding-top: 1em;">No items have been added</div>
        </template>
    </div>
</template>

<script setup>
    const props = defineProps([
        'title',
        'headers',
        'data',
        'itemsPerPage'
    ])
    const page = ref(1)
    const pageCount = computed(() => props.data ? Math.ceil(props.data.length / props.itemsPerPage) : 0)
    const pageData = computed(() => props.data ? props.data.slice((page.value - 1) * props.itemsPerPage, page.value * props.itemsPerPage) : [])
</script>

<style scoped>
    .card {
        height: fit-content;
        flex: 2;

        @media (max-width: 1024px) {
            flex: 100%;
        }
    }

    .button {
        display: inline;
    }

    .title {
        font-size: 2em;
        margin-bottom: .5rem;
    }

    .table-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1em;
    }
</style>
