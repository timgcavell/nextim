import fs from "fs";
import path, { join } from "path";
import matter from "gray-matter";

const postsDirectory = "_posts";
const postAbsolutePath = join(process.cwd(), postsDirectory);

export function getAllPosts(): Post[] {
  return getAllFiles(postAbsolutePath)
    .map((name) => getPostByName(name))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

export function getPostByName(name: string): Post {
  const realName = name.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realName}.md`);

  if (!fs.existsSync(fullPath)) {
    return <Post>{};
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    name: realName,
    title: data.title,
    date: data.date,
    content: content,
  };
}

function getAllFiles(
  absolutePath: string,
  relativePath: string = "",
  allFiles: string[] = []
): string[] {
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
}

interface Post {
  name: string;
  title: string;
  date: string;
  content: string;
}
