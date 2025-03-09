<template>
<nuxt-layout>
    <div class="full height section">
        <h1>{{ error.message }}</h1>
        <nuxt-link class="big primary button" to="/">Return to home page</nuxt-link>
    </div>
</nuxt-layout>
</template>

<script setup>
useHead ({ title: 'Error - bluprint' })
defineProps({
    error: {
        type: Object,
        default: null
    },
})
</script>
