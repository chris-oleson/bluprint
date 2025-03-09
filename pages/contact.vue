<template>
<div class="section">
    <h1>Contact Me</h1>
    <div>Have a question, bug report, or feature suggestion? Send me an email at
        <a class="link" :href="'mailto:' + email">{{ email }}</a>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Contact - bluprint' })
const email = 'chris@oleson.family'
</script>
