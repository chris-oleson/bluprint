<template>
    <div class="full height section">
        <div class="section">
            <h1 class="title">Pricing</h1>
            <div style="margin-bottom: 1em;">
                <div>Choose the plan that works best for you.</div>
                <div>Change your plan at any time!</div>
            </div>
        </div>

        <div class="full width secondary section">
            <div class="form card">
                <h2 class="title">Free</h2>
                <div>No card required!</div>
                <router-link class="big primary button" to="/dashboard">Get Started</router-link>
            </div>

            <div class="form card">
                <h2 class="title">$0<div>/month</div></h2>
                <div>Just clone the repo!</div>
                <router-link class="big primary button" to="/dashboard">Get Started</router-link>
            </div>

            <div class="form card">
                <h2 class="title">$0<div>/year</div></h2>
                <div>It's open source!</div>
                <router-link class="big primary button" to="/dashboard">Get Started</router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Store from '../utilities/store'
    import { useRouter } from 'vue-router'
    const router = useRouter()
    Store.showSidebar = false
</script>

<style scoped>
    .full.height {
        background-color: var(--secondary);
        justify-content: start;
        padding: 0;
    }

    .full.width.section {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 3em;
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
