export default function PostBody({ post }) {
  return (
    <main>
      <article dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
