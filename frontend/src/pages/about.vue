<template>
    <div class="secondary section">
        <h1 class="title">Hi, I'm Chris.</h1>
        <p>
            Making a new web app always involves a lot of boilerplate, and so I made bluprint to make that process take much less time.
        </p>
    </div>

    <div class="faq section">
        <h2 class="title">FAQ</h2>
        <div>
            <h2 class="subtitle">What is bluprint?</h2>
            <p>
                bluprint is my personal solution for creating new web applications quickly
            </p>
            <h2 class="subtitle">Why use bluprint?</h2>
            <p>
                You probably shouldn't use bluprint unless you're me. I enjoy a few odd development practices which probably won't jive with you.
                However, the code is open source and you can use it if you want to explore my eccentric development style.
            </p>
            <h2 class="subtitle">What license is this code under?</h2>
            <p>
                bluprint is licensed under the MIT license, which allows use of the code for both professional and personal projects.
            </p>
            <h2 class="subtitle">Is there any documentation?</h2>
            <p>
                Currently, the only documentation is in the README.md file in the repository.
                Since this is primarily a personal project, I'm not planning on making this code easy to use for others.
            </p>
        </div>
    </div>

    <div class="secondary full width section">
        <h1 class="title">Tech Stack</h1>
        <div class="card">
            <h2 class="subtitle">MySQL</h2>
            <div>Database</div>
        </div>
        <div class="card">
            <h2 class="subtitle">Vue</h2>
            <div>Frontend framework</div>
        </div>
        <div class="card">
            <h2 class="subtitle">Vite</h2>
            <div>Frontend build tool</div>
        </div>
        <div class="card">
            <h2 class="subtitle">Node</h2>
            <div>Web server runtime</div>
        </div>
        <div class="card">
            <h2 class="subtitle">Express</h2>
            <div>Backend framework</div>
        </div>
    </div>
</template>

<style scoped>
    .faq {
        & .subtitle {
            width: 100%;
            text-align: left;
        }
    }

    .full.width {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1em;
        & .title {
            flex: 100%;
            margin-bottom: 1em;;
        }
        & .card {
            flex: 1;
            min-width: 17em;
            height: 10em;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
    }
</style>
