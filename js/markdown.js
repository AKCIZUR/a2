export async function loadMarkdown(path) {
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error('MD not found');

        const text = await res.text();
        return marked.parse(text);
    } catch (err) {
        return `<h1>404</h1><p>${err.message}</p>`;
    }
}
