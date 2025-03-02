<template>
<div>
    <div class="above-fold">
        <div class="call-to-action">
            <h1 class="title">Jumpstart Your New App</h1>
            <h2 class="subtitle">The boring parts are already done!</h2>
            <nuxt-link class="big primary button" to="/sign-up">Get Started Today!</nuxt-link>
        </div>

        <div class="card">
            <nuxt-img class="image" src="/images/bluprint.webp"/>
        </div>
    </div>

    <div class="secondary section">
        <h2 class="title">Built-in Features</h2>
        <h2 class="subtitle">
            bluprint already has a lightweight CSS framework, authentication, email verification, a database, and Stripe integration
        </h2>
    </div>

    <div class="section">
        <h2 class="title">Easily Customizable</h2>
        <h2 class="subtitle">
            Using an opinionated framework like Nuxt, bluprint is simple to modify to your specific needs
        </h2>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'bluprint' })
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
