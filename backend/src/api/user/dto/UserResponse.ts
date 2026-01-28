import { ApiProperty } from '@nestjs/swagger'
import { ERole } from 'prisma/generated/enums'

export class UserResponse {
	@ApiProperty({
		description: 'ID пользователя',
		example: '220dea69-0cb5-47ff-a580-7d0a28498394',
		type: String
	})
	id: string

	@ApiProperty({
		description: 'Имя пользователя',
		example: 'John',
		type: String
	})
	username: string
	@ApiProperty({
		description: 'Пароль',
		example: '12345678',
		type: String
	})
	password: string

	@ApiProperty({
		description: 'Почта',
		example: 'test@example.com',
		type: String
	})
	email: string

	@ApiProperty({
		description: 'Роль пользователя',
		example: 'USER',
		type: String
	})
	role: ERole

	@ApiProperty({
		description: 'Дата создания поста',
		example: '2026-01-25 09:30:53.379',
		type: Date
	})
	createdAt: string

	@ApiProperty({
		description: 'Дата обновления поста',
		example: '2026-01-25 09:30:53.379',
		type: Date
	})
	updatedAt: string
}
