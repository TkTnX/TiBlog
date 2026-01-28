import { ApiProperty } from '@nestjs/swagger'
import { Post, Project } from 'prisma/generated/client'

export class CategoryResponse {
	@ApiProperty({
		description: 'ID категории',
		example: '220dea69-0cb5-47ff-a580-7d0a28498394',
		type: String
	})
	id: string

	@ApiProperty({
		description: 'Название категории',
		example: 'Категория 1',
		type: String
	})
	name: string

	@ApiProperty({
		description: 'Цвет категории',
		example: '#000000',
		type: String
	})
	color: string

	@ApiProperty()
	posts: Post

	@ApiProperty()
	projects: Project
}
