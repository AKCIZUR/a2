export async function loadContentIndex() {
  const res = await fetch('./content/docs-index.json');
  return await res.json();
}

export async function loadMarkdown(file) {
  const res = await fetch(`./content/${file}`);
  return await res.text();
}
