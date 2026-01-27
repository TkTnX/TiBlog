import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';















export class CommentRequest {
	@ApiProperty({
		description: 'Текст',
		example: 'Lorem ipsum....',
		type: String
	})
	@IsNotEmpty()
	@IsString()
	text: string

	@ApiProperty({
		description: 'ID пользователя',
		example: '220dea69-0cb5-47ff-a580-7d0a28498394',
		type: String
	})
	@IsOptional()
	userId?: string
}
