import DateFormatter from "./date-formatter";

export default function PostHeader({ post }) {
  return (
    <header>
      <h1>{post.title}</h1>
      <h2>{<DateFormatter dateString={post.date} />}</h2>
    </header>
  );
}
