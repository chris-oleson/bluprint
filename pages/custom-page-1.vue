<template>
<div class="dashboard"/>
</template>

<script setup>
useHead ({ title: 'Custom Page - bluprint' })
definePageMeta({
    middleware: 'require-authentication',
    layout: 'app-layout',
})
</script>
