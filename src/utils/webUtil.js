export async function writeClip(text) {
    await navigator.clipboard.writeText(text);
}

export async function readClip() {
    let text = await navigator.clipboard.readText();
    return text;
}
