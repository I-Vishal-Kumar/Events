# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Getting started

Just clone the repo from 
```bash
  import React from 'react'
```

Do npm install

```bash
  cd (project directory)
  npm install
```

# Done 👍 you are good to go run `npm run dev`


## How it works

### Tap on any date and tap add event.
<img width="168" alt="{4B4AA4A2-6568-400F-96AC-8D4772F91F61}" src="https://github.com/user-attachments/assets/cccb675b-6924-430c-b19a-1fa9c48804bd" />

### Fill the form
<img width="398" alt="{5C0899FD-CC1C-40D1-9B6C-75A26D76083F}" src="https://github.com/user-attachments/assets/e82df494-c81a-46dd-be51-ba1d475cf501" />

### After filling the form you can see the green dot initially
<img width="210" alt="{1DAD2A62-524C-4366-BCFD-4E22D2EFB3B3}" src="https://github.com/user-attachments/assets/b99ca6db-a40d-40d0-b4ce-3cd53cb8de60" />

#### Green dot for less than equal to 2 event more than 2 and less than 5 then orange if greater then red.
### How to see the event 
#### After adding the event you will see the new option view event click on that
<img width="210" alt="{1DAD2A62-524C-4366-BCFD-4E22D2EFB3B3}" src="https://github.com/user-attachments/assets/7b8259c9-f3eb-4983-9d94-826f1c9a9b2a" />

### In a new pannel the events will be listed.


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
