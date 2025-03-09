<template>
<nuxt-layout>
    <nuxt-page/>
</nuxt-layout>

<div v-if="showNotification" class="notification">
    <div class="card" :style="'background-color: ' + store.notification.color">{{ store.notification.text }}</div>
</div>
</template>

<script setup>
const store = useStore()
const colorMode = useColorMode()

onMounted(() => {
    colorMode.preference = store.theme
})

watch(() => store.theme, () => {
    colorMode.preference = store.theme
})

const showNotification = ref(false)
watch(() => store.notification, () => {
    if (store.notification.text) {
        showNotification.value = true
        setTimeout(() => {
            showNotification.value = false;
        }, "4000");
    }
})
</script>

<style scoped>
/* Notifications */
.notification {
    position: fixed;
    bottom: 1rem;
    left: 0;
    right: 0;
    & .card {
        animation: 1s ease-out 3s fadeOut forwards;
        z-index: 1000;
        margin: 0 auto;
        width: fit-content;
        text-wrap: none;
        color: white;
        border: none;
        padding: 1rem;
    }
}
@keyframes fadeOut { to { opacity: 0; } }
</style>
