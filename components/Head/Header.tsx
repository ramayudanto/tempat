import Head from "next/head";

export default function Header({ title }: any) {
  const titleConcat = `${title} | Tempat`;
  return (
    <Head>
      <title>{titleConcat}</title>
      <link rel="icon" href="./logo.svg" />
    </Head>
  );
}
