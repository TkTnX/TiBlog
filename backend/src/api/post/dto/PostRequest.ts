import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class PostRequest {
	@ApiProperty({
		description: 'Контент поста',
		example: 'Lorem ipsum....',
		type: String
	})
	@IsString()
	@IsNotEmpty()
	content: string

	@ApiProperty({
		description: 'Превью',
		example: 'https://randomimg.com/1',
		type: String
	})
	@IsString()
	@IsNotEmpty()
	preview: string

	@ApiProperty({
		description: 'Заголовок поста',
		example: 'Мой новый пост',
		type: String,
		minLength: 3,
		maxLength: 50
	})
	@IsString()
	@IsNotEmpty()
	@Length(3, 50)
	title: string

	@ApiProperty({
		description: 'Категории',
		example: [
			'd9c261fb-be4c-43ab-ba8a-cc101b18186e',
			'd9c261fb-be4c-43ab-ba8a-cc101b18186e',
			'd9c261fb-be4c-43ab-ba8a-cc101b18186e'
		],
		type: [String],
		minLength: 3,
		maxLength: 50
	})
	categories: string[]
}
