import Link from "next/link";

export default function SiteNavigation() {
  return (
    <nav>
      <Link className="nav-link" href="/">Home</Link>
      <Link className="nav-link" href="mailto:me@timgcavell.com">Email</Link>
      <Link className="nav-link" href="https://github.com/timgcavell">Code</Link>
      <Link className="nav-link" rel="me" href="https://hachyderm.io/@timcavell">Mastodon</Link>
    </nav>
  );
}
