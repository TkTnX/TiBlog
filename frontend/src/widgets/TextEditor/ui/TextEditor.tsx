"use client"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import TextAlign from "@tiptap/extension-text-align"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { MenuBar } from "./MenuBar"

export const TextEditor = () => {
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
		onUpdate: ({ editor }) => {
			console.log(editor.getJSON())
			// onChange(editor.getHTML())
		},
		immediatelyRender: false
    })
    
    

	return (
		<div>
			<MenuBar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	)
}
