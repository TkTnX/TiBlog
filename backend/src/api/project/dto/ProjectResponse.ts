import { ApiProperty } from '@nestjs/swagger'
import { CategoryResponse } from 'src/api/category/dto'

export class ProjectResponse {
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
		description: 'Превью',
		example: ['TS', 'React', 'Tailwind'],
		type: Array
	})
	stack: string[]

	@ApiProperty({
		description: 'Заголовок поста',
		example: 'Мой новый пост',
		type: String,
		minLength: 3,
		maxLength: 50
	})
	title: string

	categories: CategoryResponse[]

	@ApiProperty({
		description: 'Дата создания поста',
		example: '2026-01-25 09:30:53.379',
		type: Date
	})
	createdAt: string
}
