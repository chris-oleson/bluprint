<template>
<div class="section">
    <h1 class="title">Contact Us</h1>
    <div>Have a question, bug report, or feature suggestion? Send us an email at
        <a class="link" :href="'mailto:' + email">{{ email }}</a>
    </div>
</div>
</template>

<script setup>
useHead ({ title: 'Contact - bluprint' })
const email = 'support@bluprint.app'
</script>
