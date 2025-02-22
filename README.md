# bluprint
bluprint is a web application boilerplate for shipping new apps quickly

## Local development configuration

### On your machine
- Install the version of node specified in `package.json`
- Install the version of npm specified in `package.json`
- Install MySQL Server
- Create a `.env` file copied from `.env.example` and enter your environment information
- Run command `npm install`
- Run command `npm run dev`

## Production deployment configuration:
- Install command: `npm install`
- Run command: `npm run build`

## Coding guidelines

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
