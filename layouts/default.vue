<template>
<div>
    <landing-header/>
    <div class="content">
        <slot/>
    </div>
</div>
</template>

<style scoped>
.content {
    background-color: var(--background);
    padding-top: var(--header-height);
    position: absolute;
    width: 100%;
    min-height: 100%;
    height: 100%;
}
</style>
