<template>
<div class="card">
    <div class="toolbar">
        <h2>{{ title }}</h2>
        <div class="horizontal spacer"/>
        <button class="border icon button" title="Add" @click="newItem()">
            <Icon name="mdi:plus"/>
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
                            <Icon name="mdi:edit"/>
                        </button>
                        <button class="simple icon button" title="Delete" @click="deleteItemDialog(item); deleteDialog.showModal()">
                            <Icon name="mdi:delete"/>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="table-footer">
            <button class="simple icon button" :class="{'disabled': page == 1}" @click="page--">
                <Icon name="mdi:menu-left"/>
            </button>
            <div>Page {{ page }} of {{ pageCount }}</div>
            <button class="simple icon button" :class="{'disabled': page == pageCount}" @click="page++">
                <Icon name="mdi:menu-right"/>
            </button>
        </div>
    </template>

    <template v-else>
        <div class="horizontal divider" style="margin: 1rem 0;"/>
        <div>No items have been added</div>
    </template>

    <!-- Add or edit asset dialog -->
    <dialog ref='dialog' class="dialog" @click.self="dialog.close()">
        <div class="form card">
            <h3>New Item</h3>
            <input v-model="editedItem.name" type="text" class="text field" placeholder="Name">
            <select v-model="editedItem.type" class="dropdown" required>
                <option disabled hidden value="">Type</option>
                <option v-for="(option, i) in options" :key="i">{{ option }}</option>
            </select>
            <input v-if="!editedItem.plaid_account_id" v-model="editedItem.quantity" type="text" class="text field" placeholder="Quantity">
            <button class="primary button" @click="save()">Save</button>
            <button class="simple button" @click="dialog.close()">Cancel</button>
        </div>
    </dialog>

    <!-- Delete asset dialog -->
    <dialog ref='deleteDialog' class="dialog" @click.self="deleteDialog.close()">
        <div class="form card">
            <div>Are you sure you want to delete this item?</div>
            <button class="primary error button" @click="deleteData()">Yes</button>
            <button class="simple button" @click="deleteDialog.close()">Cancel</button>
        </div>
    </dialog>
</div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'Actions Table'
    },
    headers: {
        type: Array,
        default: () => []
    },
    data: {
        type: Array,
        default: () => []
    },
    itemsPerPage: {
        type: Number,
        default: 10
    }
})
const localData = ref([...props.data])
const dialog = ref(null)
const deleteDialog = ref(null)
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
    dialog.value.showModal()
}

function editItem (item) {
    editedIndex.value = localData.value.indexOf(item)
    editedItem.value = Object.assign({}, item)
    dialog.value.showModal()
}

function save () {
    if (editedIndex.value > -1) {
        updateData(editedItem.value)
    } else {
        createData(editedItem.value)
    }
    dialog.value.close()
}

function deleteItemDialog (item) {
    editedIndex.value = localData.value.indexOf(item)
    editedItem.value = Object.assign({}, item)
}

async function createData(item) {
    localData.value.push(item)
}

async function updateData() {
    Object.assign(localData.value[editedIndex.value], editedItem.value)
}

async function deleteData() {
    localData.value.splice(editedIndex.value, 1)
    deleteDialog.value.close()
}

const options = [
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
}

.table-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1em;
}
</style>
