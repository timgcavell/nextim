import Head from "next/head";
import SiteNavigation from "../components/site-navigation";
import WritingNavigation from "../components/writing-navigation";
import { getAllPosts } from "../lib/api";
import { SITE_NAME } from "../lib/constants";

export const config = {
  unstable_runtimeJS: false,
};

export default function Index({ allPosts }) {
  return (
    <>
      <Head>
        <title>{SITE_NAME}</title>
      </Head>
      <header>
        <h1>Tim Cavell</h1>
        <h2>Programmer</h2>
      </header>
      <SiteNavigation />
      <main>
        <WritingNavigation posts={allPosts} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts();
  return {
    props: { allPosts },
  };
}
