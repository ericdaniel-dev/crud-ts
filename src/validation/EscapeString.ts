function escapeString(text: string): string {
    return text.replace(/[&<>"'/]/g, (match) => {
        switch (match) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&#x27;';
            case '/':
                return '&#x2F;';
            default:
                return match;
        }
    });
}

export default escapeString;