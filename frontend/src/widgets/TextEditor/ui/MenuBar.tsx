import { Editor } from "@tiptap/react"
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Bold,
	Heading1,
	Heading2,
	Heading3,
	Highlighter,
	ImageIcon,
	Italic,
	List,
	ListOrdered,
	Strikethrough
} from "lucide-react"

import { useUploads } from "@/src/shared/hooks"

interface Props {
	editor: Editor | null
}

export const MenuBar = ({ editor }: Props) => {
	const { uploadMutation } = useUploads()
	if (!editor) {
		return null
	}

	const { mutate: upload } = uploadMutation({
		onSuccess: (src: string) => {
			editor.commands.setImage({ src })
		}
	})

	const Options = [
		{
			icon: <Heading1 className='size-4' />,
			onClick: () =>
				editor.chain().focus().toggleHeading({ level: 1 }).run(),
			preesed: editor.isActive("heading", { level: 1 })
		},
		{
			icon: <Heading2 className='size-4' />,
			onClick: () =>
				editor.chain().focus().toggleHeading({ level: 2 }).run(),
			preesed: editor.isActive("heading", { level: 2 })
		},
		{
			icon: <Heading3 className='size-4' />,
			onClick: () =>
				editor.chain().focus().toggleHeading({ level: 3 }).run(),
			preesed: editor.isActive("heading", { level: 3 })
		},
		{
			icon: <Bold className='size-4' />,
			onClick: () => editor.chain().focus().toggleBold().run(),
			preesed: editor.isActive("bold")
		},
		{
			icon: <Italic className='size-4' />,
			onClick: () => editor.chain().focus().toggleItalic().run(),
			preesed: editor.isActive("italic")
		},
		{
			icon: <Strikethrough className='size-4' />,
			onClick: () => editor.chain().focus().toggleStrike().run(),
			preesed: editor.isActive("strike")
		},
		{
			icon: <AlignLeft className='size-4' />,
			onClick: () => editor.chain().focus().setTextAlign("left").run(),
			preesed: editor.isActive({ textAlign: "left" })
		},
		{
			icon: <AlignCenter className='size-4' />,
			onClick: () => editor.chain().focus().setTextAlign("center").run(),
			preesed: editor.isActive({ textAlign: "center" })
		},
		{
			icon: <AlignRight className='size-4' />,
			onClick: () => editor.chain().focus().setTextAlign("right").run(),
			preesed: editor.isActive({ textAlign: "right" })
		},
		{
			icon: <List className='size-4' />,
			onClick: () => editor.chain().focus().toggleBulletList().run(),
			preesed: editor.isActive("bulletList")
		},
		{
			icon: <ListOrdered className='size-4' />,
			onClick: () => editor.chain().focus().toggleOrderedList().run(),
			preesed: editor.isActive("orderedList")
		},
		{
			icon: <Highlighter className='size-4' />,
			onClick: () => editor.chain().focus().toggleHighlight().run(),
			preesed: editor.isActive("highlight")
		},
		{
			icon: <ImageIcon className='size-4' />,
			onClick: () => addImage()
		}
	]

	const addImage = () => {
		const input = document.createElement("input")
		input.type = "file"
		input.accept = "image/*"

		input.onchange = async () => {
			const file = input.files?.[0]
			if (!file) return

			const url = URL.createObjectURL(file)
			editor.chain().focus().setImage({ src: url }).run()

			await upload(file)
		}
		input.click()
	}

	return (
		<div className='bg-background z-50 mb-1 space-x-2 rounded-md border p-1'>
			{Options.map((option, index) => (
				<button
					key={index}
					onClick={option.onClick}
					className={`rounded p-2 transition ${option.preesed ? "bg-muted" : "hover:bg-muted/50"} `}
					type='button'
				>
					{option.icon}
				</button>
			))}
		</div>
	)
}
