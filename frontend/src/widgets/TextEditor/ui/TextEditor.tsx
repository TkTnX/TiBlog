"use client"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { MenuBar } from "./MenuBar"

interface Props {
	setContent: (text: string) => void
}

export const TextEditor = ({ setContent }: Props) => {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bulletList: {
					HTMLAttributes: {
						class: "list-disc ml-3"
					}
				},
				orderedList: {
					HTMLAttributes: {
						class: "list-decimal ml-3"
					}
				}
			}),
			Image.configure({
				inline: false,
				allowBase64: true
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"]
			}),
			Highlight
		],
		editorProps: {
			attributes: {
				class: "min-h-[156px] border rounded-md bg-background py-2 px-3 tiptap-editor "
			}
		},
		onUpdate: () => {
			setContent(editor?.getHTML() || "")
		},
		immediatelyRender: false
	})

	if (!editor) return null
	return (
		<div>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	)
}
