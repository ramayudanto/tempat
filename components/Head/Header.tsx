import Head from "next/head";

export default function Header({ title }: any) {
  const titleConcat = `${title} | Tempat`;
  return (
    <Head>
      <title>{titleConcat}</title>
      <link rel="icon" href="/logo.svg" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
    </Head>
  );
}
