<template>
<div class="full height full width secondary section">
    <div class="section">
        <h1>Pricing</h1>
        <div style="margin-bottom: 1em;">
            <div>Choose the plan that works best for you.</div>
            <div>Change your plan at any time!</div>
        </div>
    </div>

    <div class="full width secondary section">
    <div class="row">
            <div class="skinny form card">
                <h2>Free</h2>
                <div>No card required!</div>
                <nuxt-link class="big primary button" to="/dashboard">Get Started</nuxt-link>
            </div>

            <div class="skinny form card">
                <h2>$0<div>/month</div></h2>
                <div>Just clone the repo!</div>
                <nuxt-link class="big primary button" to="/dashboard">Get Started</nuxt-link>
            </div>

            <div class="skinny form card">
                <h2>$0<div>/year</div></h2>
                <div>It's open source!</div>
                <nuxt-link class="big primary button" to="/dashboard">Get Started</nuxt-link>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Pricing - bluprint' })
</script>

<style scoped>
.full.height {
    background-color: var(--secondary);
    justify-content: start;
    padding: 0;
}

.row {
    gap: 2em;
}

.card {
    margin-top: -10em;
    margin-bottom: 10em;
    padding: 4em;
    gap: 2em;
    & .title {
        margin: 0;
        & div {
            display: inline;
            font-size: .5em;
        }
    }
}
</style>
