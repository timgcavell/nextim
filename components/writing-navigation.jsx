export default function WritingNavigation({ posts }) {
  return (
    <>
      <h3>Writing</h3>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.slug}>
              <a href={post.slug}>{post.title}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
