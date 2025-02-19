<template>
    <div class="card">
        <div class="toolbar">
            <h1 class="title">{{ title }}</h1>
            <div class="horizontal spacer"></div>
            <button class="border icon button" @click="newItem()">
                <Icon name="ic:baseline-plus"/>
            </button>
        </div>

        <template v-if="data.length">
            <table>
                <thead>
                    <tr>
                        <th v-for="(header, i) in headers" :key="i" :style="'text-align:' + header.align">{{ header.display }}</th>
                        <th style="text-align: end;">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, i) in pageData" :key="i">
                        <td v-for="(header, j) in headers" :key="j" :style="'text-align:' + header.align">{{ item[header.key] }}</td>
                        <td style="text-align: end">
                            <button class="simple icon button" title="Edit" @click="editItem(item)">
                                <Icon name="ic:baseline-edit"/>
                            </button>
                            <button class="simple icon button" title="Delete" @click="deleteItemDialog(item)">
                                <Icon name="ic:baseline-delete"/>
                            </button>
                        </td>
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
            <div style="padding-top: 1em;">No {{ type.toLowerCase() }} have been added</div>
        </template>

        <!-- Add or edit asset dialog -->
        <div v-if="showDialog" class="dialog" @mousedown.self.stop="showDialog = false">
            <div class="form card">
                <h2 class="subtitle">New Item</h2>
                <input type="text" class="text field" v-model="editedItem.name" placeholder="Name"/>
                <select class="dropdown" required v-model="editedItem.type">
                    <option disabled hidden value="">Type</option>
                    <option v-for="(type, i) in types" :key="i">{{ type }}</option>
                </select>
                <input v-if="!editedItem.plaid_account_id" type="text" class="text field" v-model="editedItem.quantity" placeholder="Quantity"/>
                <button class="primary button" @click="save">Save</button>
                <button class="simple button" @click="showDialog = false">Cancel</button>
            </div>
        </div>

        <!-- Delete asset dialog -->
        <div v-if="showDeleteDialog" class="dialog">
            <div class="form card">
                <div>Are you sure you want to delete this item?</div>
                <button class="primary error button" @click="deleteData">Yes</button>
                <button class="simple button" @click="showDeleteDialog = false">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps([
        'title',
        'headers',
        'data',
        'color',
        'type',
        'itemsPerPage'
    ])
    const localData = ref([...props.data])
    const showMenu = ref(false)
    const showDialog = ref(false)
    const showDeleteDialog = ref(false)
    const page = ref(1)
    const pageCount = computed(() => Math.ceil(localData.value.length / props.itemsPerPage))
    const pageData = computed(() => localData.value.slice((page.value - 1) * props.itemsPerPage, page.value * props.itemsPerPage))

    const editedIndex = ref(-1)
    const editedItem = ref({})
    const defaultItem = {
        name: '',
        type: '',
        quantity: '',
    }

    function newItem() {
        editedItem.value = Object.assign({}, defaultItem)
        editedIndex.value = -1
        showMenu.value = false
        showDialog.value = true
    }

    function editItem (item) {
        editedIndex.value = localData.value.indexOf(item)
        editedItem.value = Object.assign({}, item)
        showDialog.value = true
    }

    function save () {
        if (editedIndex.value > -1) {
            updateData(editedItem.value)
        } else {
            createData(editedItem.value)
        }
        showDialog.value = false
    }

    function deleteItemDialog (item) {
        editedIndex.value = localData.value.indexOf(item)
        editedItem.value = Object.assign({}, item)
        showDeleteDialog.value = true
    }

    async function createData(item) {
        localData.value.push(item)
    }

    async function updateData() {
        Object.assign(localData.value[editedIndex.value], editedItem.value)
    }

    async function deleteData() {
        localData.value.splice(editedIndex.value, 1)
        showDeleteDialog.value = false
    }

    const types = [
        'Fruit',
        'Vegetable',
        'Pastry',
        'Meat',
        'Soup'
    ]
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

    .toolbar {
        display: flex;
        align-items: center;
        height: fit-content;
        gap: 1em;
        text-wrap: nowrap;
        & .title {
            font-size: 2em;
        }
    }

    .table-footer {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1em;
    }
</style>
