<template>
<div class="form card">
    <label class="label">Text Field
        <input type="text" class="text field" placeholder="Placeholder">
    </label>

    <label class="label">Dropdown
        <select v-model="dropdown" required class="dropdown">
            <option disabled hidden value="">Placeholder</option>
            <option v-for="(option, i) in options" :key="i">{{ option }}</option>
        </select>
    </label>

    <label class="label">Checkbox
        <input type="checkbox" checked class="checkbox">
    </label>

    <button class="border button">Button</button>

    <div class="horizontal button group">
        <button class="border button" :class="{'selected': selected == 1}" @click="selected = 1">Button</button>
        <button class="border button" :class="{'selected': selected == 2}" @click="selected = 2">Button</button>
        <button class="border button" :class="{'selected': selected == 3}" @click="selected = 3">Button</button>
    </div>

    <div class="vertical button group">
        <button class="border button" :class="{'selected': selected == 1}" @click="selected = 1">Button</button>
        <button class="border button" :class="{'selected': selected == 2}" @click="selected = 2">Button</button>
        <button class="border button" :class="{'selected': selected == 3}" @click="selected = 3">Button</button>
    </div>
</div>
</template>

<script setup>
const selected = ref(2)
const dropdown = ''
const options = [
    'Option 1',
    'Option 2',
    'Option 3'
]
</script>
