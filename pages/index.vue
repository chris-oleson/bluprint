<template>
<div>
    <div class="above-fold">
        <div class="call-to-action">
            <h1>Jumpstart Your New App</h1>
            <h3>The boring parts are already done!</h3>
            <nuxt-link class="big primary button" to="/sign-up">Get Started Today!</nuxt-link>
        </div>

        <div class="card">
            <nuxt-img class="image" src="/images/bluprint.webp"/>
        </div>
    </div>

    <div class="secondary section">
        <h2>Built-in Features</h2>
        <h3>
            bluprint already has a lightweight CSS framework, authentication, email verification, a database, and Stripe integration
        </h3>
    </div>

    <div class="section">
        <h2>Easily Customizable</h2>
        <h3>
            Using an opinionated framework like Nuxt, bluprint is simple to modify to your specific needs
        </h3>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'bluprint' })
</script>

<style scoped>
.section {
    padding: 10em 1em;
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
    & h1 {
        font-size: 4em;
    }
    & h3 {
        margin: 3rem 0;
    }
    @media (max-width: 1280px) {
        flex: 100%;
    }
}

h3 {
    text-align: center;
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
