export default async function markdownToHtmlShowdown(markdown: string) {
  const showdown = require("showdown");
  const converter = new showdown.Converter();
  return converter.makeHtml(markdown);
}
