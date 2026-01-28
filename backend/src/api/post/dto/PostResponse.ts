import { ApiProperty } from "@nestjs/swagger";
import { Comment, Like } from "prisma/generated/client";
import { CategoryResponse } from "src/api/category/dto";

















export class PostResponse {
	@ApiProperty({
		description: 'ID поста',
		example: '220dea69-0cb5-47ff-a580-7d0a28498394',
		type: String
	})
	id: string

	@ApiProperty({
		description: 'Контент поста',
		example: 'Lorem ipsum....',
		type: String
	})
	content: string

	@ApiProperty({
		description: 'Превью',
		example: 'https://randomimg.com/1',
		type: String
	})
	preview: string

	@ApiProperty({
		description: 'Заголовок поста',
		example: 'Мой новый пост',
		type: String,
		minLength: 3,
		maxLength: 50
	})
	title: string

	categories: CategoryResponse[]
	likes: Like[]
	comments: Comment[]

	@ApiProperty({
		description: 'Дата создания поста',
		example: '2026-01-25 09:30:53.379',
		type: Date,
	})
    createdAt: string
    
	@ApiProperty({
		description: 'Дата обновления поста',
		example: '2026-01-25 09:30:53.379',
		type: Date,
	})
	updatedAt: string
}