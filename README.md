# VuFi
VuFi is a web application for automatically tracking and visualizing your financial data.

## Local development configuration

### On your machine
- Install the version of node specified in `package.json`
- Install the version of npm specified in `package.json`
- Install MySQL Server

### In the backend folder
- Create a `.env` file copied from `.env.example` and enter your enviroment information
- Connect to the local MySQL Server and import `schema.sql` to install the DB schema

### In the frontend folder
- Create a `.env` file copied from `.env.example` and enter your enviroment information

## Production deployment configuration:

### Backend
- Base directory: `/backend`
- Install command: `npm install`
- Run command: `node /index.js`

### Frontend
- Base directory: `/frontend`
- Install command: `npm install`
- Build command: `npm run build`
- Publish directory: `/dist`

### Cron Jobs
Set these commands to run nightly:
- `curl -X POST 'https://api.vufi.app/auth/update'`
- `curl -X POST 'https://api.vufi.app/currenices/update'`
- `curl -X POST 'https://api.vufi.app/plaid/update'`

## Coding guidelines

### File Structure
- Router views belong in `/src/pages`
- Other vue components go in the `/src/components`
- Images, fonts, and icons go in `/src/assets`
- Other code used in multiple files goes in `/src/utilities`
- File and folder names should be in `kebab-case`

### Comments
- Avoid comments unless explaining why your code is the way it is
- Write code in a descriptive way instead of describing your code with comments

### HTML
- Each page should only have one `<h1>` tag
- Respect HTML tag intentions (e.g. don't turn a `<p>` tag into a button)

### CSS
- Classes should be in `kebab-case`
- If the styled element will only exist once (e.g. a header bar), keep the styling scoped to its vue component
- If the styled element will appear multiple times, put the class in the `style.css` file
- Avoid adding global styling rules to HTML elements; use classes instead
- If the styled element will have multiple types, try to make a class syntax scoped to a base class; this avoids repeated rules and makes the html more readable. For example:
```
<button class="red button">Click Me</button>

.button {
    color: white;
    border: 1px solid black;
    border-radius: 5px;

    &.blue {
        background-color: blue;
    }

    &.red {
        background-color: red;
    }
}
```

### Javascript
- Avoid Object Oriented Programming
- Functions should be pure unless inside a Vue component
- Keep functions near to related code if possible
- Use 4 space indentation
- Use relative paths for imports
- Variables and function names should be in `camelCase`
- Class names should be `PascalCase`
- Avoid abbreviation (e.g. "err", "db", "utils")
- Variable names should be nouns (e.g. "currency", "items")
- Function names should be verb phrases (e.g. "formatCurrency()", "getItems()")
- Class names should be singular nouns (e.g. "CurrencyConverter", "ItemList")

### Vue
- Use the composition API
- Avoid passing props through multiple components
- If multiple components need to share state, and those components do not have a parent-child relationship, use the global state in `src/utilities/store` instead of props
