<template>
<NuxtLayout>
    <NuxtPage/>
</NuxtLayout>
</template>

<script setup>
const store = useStore()
const colorMode = useColorMode()
colorMode.preference = store.theme
watch(() => store.theme, () => {
    colorMode.preference = store.theme
})
</script>
 