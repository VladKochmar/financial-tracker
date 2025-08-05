# Financial Tracker App

This is a finance tracking app built with React (TypeScript), Tailwind CSS, Shadcn UI, and Zustand. It allows you to record income and expenses by different categories (food, entertainment, salary, etc.), as well as create your own categories with color choices (via @uiw/react-color-wheel).

## 🔗 Demo

[Open demo](https://financial-tracker-omega.vercel.app/)

## 🧰 Installation

Use the package manager [npm](https://www.npmjs.com/) to install Todo App.

```bash
git clone https://github.com/VladKochmar/financial-tracker.git
cd financial-tracker

npm install
npm run dev        # start in development mode
npm run build      # production build
npm run preview    # preview build
npm run test       # test launch
```

## 🚀 Technologies

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS 4](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Vite](https://vite.dev/)
- [Vitest](https://vitest.dev/)
- [ESLint](https://eslint.org/)

## 🧩 Functionality

- Adding transactions (income/expenses)
- Filter by category, date
- Expense chart by category
- Income/expense statistics
- Storage in localStorage (via Zustand)
- Adaptive design

## ✨ Implementation features

- Zustand + localStorage: Transaction status is stored in Zustand with automatic saving to localStorage;
- Grid layout: the main interface is built using CSS Grid;
- Modularity: components are isolated — easy to scale;
- Recharts: visualization of expenses in the form of a pie chart.

## 👤 Author

[Vladyslav Kochmar](https://github.com/VladKochmar)

## License

This project is licensed under [MIT](https://choosealicense.com/licenses/mit/). Free to use and modify.
