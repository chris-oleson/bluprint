<template>
<header class="header">
    <nuxt-link class="logo link" to="/">
        <img src="../assets/images/logo.png" height="42" width="42" alt="bluprint logo">
        <h2 class="subtitle">bluprint</h2>
    </nuxt-link>

    <div class="horizontal spacer"/>
</header>
</template>

<style scoped>
.logo {
    display: flex;
    align-items: center;
    gap: .5em;
}

.vertical.list {
    border: none;
    position: fixed;
    top: var(--header-height);
    left: 0;
    right: 0;
    bottom: 0;
    & .button {
        width: 100%;
        text-align: end;
        text-transform: none;
    }
}
</style>
