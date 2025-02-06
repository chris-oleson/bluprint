<template>
    <div class="above-fold">
        <div class="call-to-action">
            <h1 class="title">Jumpstart Your New App</h1>
            <h2 class="subtitle">The boring parts are already done!</h2>
            <router-link class="big primary button" to="/sign-up">Get Started Today!</router-link>
        </div>

        <div class="card">
            <img class="image" src="../assets/images/bluprint.jpg"/>
        </div>
    </div>

    <div class="secondary section">
        <h2 class="title">Built-in Authentication</h2>
        <h2 class="subtitle">
            bluprint already has a full backend with user management.
        </h2>
    </div>

    <div class="section">
        <h2 class="title">Easily Customizable</h2>
        <h2 class="subtitle">
            With an intuitive css layout, it's easy to make global UI changes
        </h2>
    </div>
</template>

<script setup>
    import Store from '../utilities/store'
    Store.showSidebar = false
</script>

<style scoped>
    .section {
        padding: 10em 1em;
        gap: 3em;
    }

    .above-fold {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        padding: 1em;
    }

    .call-to-action {
        margin: 5em 1em;
        text-align: center;
        flex: 2;
        & .button {
            font-size: 1.25em;
            text-transform: none;
            width: fit-content;
            margin: auto;
            text-wrap: wrap;
        }
        & .title {
            font-size: 4em;
        }
        & .subtitle {
            margin: 2em 0;
        }
        @media (max-width: 1280px) {
            flex: 100%;
        }
    }

    .card {
        flex: 3;
        margin: 1em;
        margin-bottom: -6em;
        padding: 0;
        @media (max-width: 1280px) {
            flex: 100%;
        }
    }
</style>
