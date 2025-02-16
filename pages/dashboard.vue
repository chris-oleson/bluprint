<template>
    <div class="layout"></div>
</template>

<script setup>
    useHead ({ title: 'Dashboard - bluprint' })

    definePageMeta({
        middleware: 'require-authentication',
        layout: 'show-sidebar',
    })
</script>
