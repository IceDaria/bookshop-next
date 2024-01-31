import { PropsWithChildren } from "react";
import Head from "next/head";
import Header from "../header/Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Head>
        <title>BookShop on Next</title>
        <meta name="description" content="SkillFactory Next.js project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        
      <div>
        <header>
          <Header />
        </header>
        <main>{children}</main>
          <footer></footer>
      </div>
    </>
  );
}