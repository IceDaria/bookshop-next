#### Проект книжного магазина на Next.js, использующий API Google Books

Проект будет использовать API от Google Books, который позволяет искать информацию о разных книгах и узнавать их цену в магазине Google Play. Для получения списка книг вам не потребуется использовать ключ. В проекте будет много интерактивных элементов: слайдер на главной странице, авторизация, корзина и фильтры по книгам.


Макет книжного магазина основан на предыдущем проекте(https://github.com/IceDaria/bookshop__yakubchik.git), который вы сделали на стандартном JavaScript. Но в этот раз вы будете использовать другие технологии. Кроме того, в новом приложении будет расширенный функционал.

### РИТЕРИИ ОЦЕНИВАНИЯ

1. Проект использует TypeScript
2. Проект использует встроенные методы Next.js для получения данных (getStaticProps или getServerSideProps)
3. Вёрстка соответствует макету
4. Добавлены страницы профиля и корзины 
5. На главной странице создан слайдер на чистом React
6. На главной странице присутствует фильтр по типу книг, который работает с помощью Redux Toolkit
7. В проекте используются API Routes в качестве BFF
8. В приложении работает корзина для авторизованного пользователя, в которую можно добавлять книги

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
