<template>
<div>
    <app-header/>
    <side-bar/>
    <div class="content" :class="{'sidebar': viewport.isGreaterThan('tablet')}">
        <slot/>
    </div>
</div>
</template>

<script setup>
const viewport = useViewport()
</script>

<style scoped>
.content {
    background-color: var(--background);
    padding-top: var(--header-height);
    position: absolute;
    width: 100%;
    min-height: 100%;
    height: 100%;
    &.sidebar {
        padding-left: var(--sidebar-width);
    }
}
</style>
