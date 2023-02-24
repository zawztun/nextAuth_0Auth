import Head from "next/head";
import { useSession } from "next-auth/react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const { data, status } = useSession();
  console.log(data);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className="text-3xl w-3/4 mx-auto">
          Welcome to NextJS
          {data ? ` ${data.user?.name} ` : ""}
        </h1>
      </main>
    </>
  );
}
