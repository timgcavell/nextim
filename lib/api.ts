import fs from "fs";
import path, { join } from "path";
import matter from "gray-matter";
import { Post } from "../model/post";

const postsDirectory = "_posts";
const postAbsolutePath = join(process.cwd(), postsDirectory);

export function getPostSlugsRec() {
  return getAllFiles(postAbsolutePath);
}

const getAllFiles = function (
  absolutePath: string,
  relativePath: string = "",
  allFiles: any[] = []
) {
  const files = fs.readdirSync(absolutePath);

  files.forEach((file) => {
    const newAbsolutePath = path.join(absolutePath, file);
    const newRelativePath = path.join(relativePath, file);

    if (fs.statSync(newAbsolutePath).isDirectory()) {
      allFiles = getAllFiles(newAbsolutePath, newRelativePath, allFiles);
    } else {
      allFiles.push(newRelativePath);
    }
  });

  return allFiles;
};

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) {
    return <Post>{};
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const post: Post = <Post>{};

  post.slug = realSlug;
  post.content = content;
  post.title = data.title;
  post.date = data.date;

  return post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugsRec();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
