<template>
    <div class="dashboard"/>
</template>

<script setup>
    useHead ({ title: 'Dashboard - bluprint' })

    definePageMeta({
        middleware: 'require-authentication',
        layout: 'app-layout',
    })
</script>
