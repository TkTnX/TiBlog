import { ApiProperty } from '@nestjs/swagger'
import { IsHexColor, IsNotEmpty, IsString } from 'class-validator'

export class CategoryRequest {
	@ApiProperty({
		description: 'Название категории',
		example: 'Категория 1',
		type: String
	})
	@IsNotEmpty()
	@IsString()
	name: string

	@ApiProperty({
		description: 'Цвет категории',
		example: '#000000',
		type: String
	})
	@IsNotEmpty()
	@IsString()
	@IsHexColor()
	color: string
}
