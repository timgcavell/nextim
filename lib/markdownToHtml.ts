const { marked } = require('marked');

export default async function markdownToHtml(markdown: string) {
    return marked.parse(markdown);
}
