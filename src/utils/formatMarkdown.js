/**
 * Simple markdown-like formatting for node detail text.
 */
export default function formatMarkdown(text) {
    if (!text) return '';
    return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n• /g, '</p><p class="bullet">• ')
        .replace(/\n/g, '<br/>');
}
