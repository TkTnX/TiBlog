import DOMPurify from "dompurify"

export function htmlToText(html: string, maxLength = 160) {
	const clean = DOMPurify.sanitize(html, {
		ALLOWED_TAGS: [],
		ALLOWED_ATTR: []
	})

	const text = clean.replace(/\s+/g, " ").trim()

	return text.length > maxLength ? text.slice(0, maxLength) + "..." : text
}
