<template>
<div class="form card">
    <h2 class="title">Form Interface</h2>

    <div class="row">
        <div class="column">
            <label class="label">Text Field
                <input type="text" class="text field" placeholder="Placeholder">
            </label>

            <label class="label">Dropdown
                <select v-model="dropdown" required class="dropdown">
                    <option disabled hidden value="">Placeholder</option>
                    <option v-for="(option, i) in options" :key="i">{{ option }}</option>
                </select>
            </label>

            <button class="border button" @click="dialog.showModal()">Open Dialog</button>
            <div class="horizontal group">
                <button class="border button" :class="{'selected': selected == 1}" @click="selected = 1">Button 1</button>
                <button class="border button" :class="{'selected': selected == 2}" @click="selected = 2">Button 2</button>
                <button class="border button" :class="{'selected': selected == 3}" @click="selected = 3">Button 3</button>
            </div>
        </div>

        <div class="small column">
            <label class="label">Checkbox
                <input type="checkbox" checked class="checkbox">
            </label>

            <div class="vertical group">
                <button class="border button" :class="{'selected': selected == 1}" @click="selected = 1">Button 1</button>
                <button class="border button" :class="{'selected': selected == 2}" @click="selected = 2">Button 2</button>
                <button class="border button" :class="{'selected': selected == 3}" @click="selected = 3">Button 3</button>
            </div>
        </div>
    </div>

    <dialog ref='dialog' class="dialog" @click.self="dialog.close()">
        <div class="form card">
            <div>This is a dialog</div>
            <button class="border button" @click="dialog.close()">Close Dialog</button>
        </div>
    </dialog>
</div>
</template>

<script setup>
const selected = ref(2)
const dialog = ref(null)
const dropdown = ''
const options = [
    'Option 1',
    'Option 2',
    'Option 3'
]
</script>

<style scoped>
.row, .column {
    gap: 1rem;
}
</style>
