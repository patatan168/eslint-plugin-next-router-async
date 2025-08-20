# eslint-plugin-next-router-async

Enforces async usage of `params` and `searchParams` in Next.js App Router components.

## 🔧 Requirements

This plugin requires:

- ESLint v8+
- Next.js v15+ (App Router)

Make sure your project has these installed.

## 📦 Installation

```bash
npm install eslint-plugin-next-router-async --save-dev
```

## 🔧 Usage

```js
{
  "plugins": ["next-router-async"],
  "rules": {
    "next-router-async/enforce-async-params": "error"
  }
}
```

ESLint v9+

```js
{
files: ['**/*.js'],
plugins: {
    'next-router-async': plugin,
},
rules: {
    'next-router-async/enforce-async-params': 'error',
},
}
```

## 📐 Rule: enforce-async-params

### ❌ Incorrect

```js
export function Page({ params, searchParams }) {}
```

### ✅ Valid

```js
export async function Page({ params, searchParams }) {}
```
