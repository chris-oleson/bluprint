<template>
<NuxtLayout>
    <div class="full height section">
        <h1 class="title">{{ error.message }}</h1>
        <nuxt-link class="big primary button" to="/">Return to home page</nuxt-link>
    </div>
</NuxtLayout>
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
