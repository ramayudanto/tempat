import Head from "next/head";

export default function Header({ title }: any) {
  return (
    <Head>
      <title>{title} | Tempat</title>
      <link rel="icon" href="./logo.svg" />
    </Head>
  );
}
