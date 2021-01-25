import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Head from "next/head";
import PostHeader from "../components/post-header";
import SiteNavigation from "../components/site-navigation";
import { getPostByName, getAllPosts } from "../lib/api";
import { SITE_NAME } from "../lib/constants";
import markdownToHtml from "../lib/markdownToHtml";
import PostBody from "../components/post-body";

export const config = {
  unstable_runtimeJS: false,
};

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.name) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <Head>
        <title>
          {post.title} | {SITE_NAME}
        </title>
      </Head>
      <PostHeader post={post} />
      <SiteNavigation />
      <PostBody post={post} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostByName(params.post.join("/"));
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts();

  return {
    paths: posts.map((post) => {
      if (!post.name) {
        return {
          params: {
            post: [],
          },
        };
      }

      return {
        params: {
          post: post.name.split("/"),
        },
      };
    }),
    fallback: false,
  };
}
