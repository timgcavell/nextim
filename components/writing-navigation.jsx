export default function WritingNavigation({ posts }) {
  return (
    <>
      <h3>Writing</h3>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.name}>
              <a href={post.name}>{post.title}</a>
            </li>
          );
        })}
      </ul>
    </>
  );
}
