<template>
<div>
    <div class="secondary section">
        <h1>Hi, I'm Chris.</h1>
        <p>
            Making a new web app always involves a lot of boilerplate, and so I made bluprint to make that process take much less time.
        </p>
    </div>

    <div class="section">
        <h2>FAQ</h2>
        <div>
            <h3>What is bluprint?</h3>
            <p>
                bluprint is my personal solution for creating new web applications quickly.
            </p>
            <h3>Why use bluprint?</h3>
            <p>
                You probably shouldn't use bluprint unless you're me. I enjoy a few odd development practices which probably won't jive with you.
                However, the code is open source and you can use it if you want to explore my eccentric development style.
            </p>
            <h3>What license is this code under?</h3>
            <p>
                bluprint is licensed under the MIT license, which allows use of the code for both professional and personal projects.
            </p>
            <h3>Is there any documentation?</h3>
            <p>
                Currently, the only documentation is in the README.md file in the repository.
                Since this is primarily a personal project, I'm not planning on making this code easy to use for others.
            </p>
        </div>
    </div>

    <div class="secondary full width section">
        <h2>Tech Stack</h2>
        <div class="row">
            <div class="card">
                <h3>Nuxt</h3>
                <p>Web application framework</p>
            </div>
            <div class="card">
                <h3>MySQL</h3>
                <p>Database</p>
            </div>
            <div class="card">
                <h3>Postmark</h3>
                <p>Email delivery</p>
            </div>
            <div class="card">
                <h3>Stripe</h3>
                <p>Payment processing</p>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'About - bluprint' })
</script>

<style scoped>
.card {
    flex: 1;
    min-width: 17em;
    height: 10em;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & p {
        text-align: center;
        margin: 0;
    }
}
</style>
