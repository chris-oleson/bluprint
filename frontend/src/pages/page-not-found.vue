<template>
    <div class="full height section">
        <h1 class="title">Page not found</h1>
        <div>Please make sure you have the correct url and permissions</div>
        <router-link class="big primary button" to="/">Return to home page</router-link>
    </div>
</template>

<script setup>
    import Store from '../utilities/store'
    Store.showSidebar = false
</script>
