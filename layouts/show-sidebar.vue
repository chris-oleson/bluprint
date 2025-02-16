<template>
    <top-bar></top-bar>
    <side-bar></side-bar>
    <div class="content">
        <slot></slot>
    </div>
</template>

<style scoped>
    .content {
        background-color: var(--background);
        padding-top: var(--header-height);
        padding-left: var(--sidebar-width);
        position: absolute;
        width: 100%;
        min-height: 100%;
        height: 100%;
    }
</style>
