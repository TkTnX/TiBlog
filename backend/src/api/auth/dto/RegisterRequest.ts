import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';















export class RegisterRequest {
	@ApiProperty({
		description: 'Имя пользователя',
		example: 'John',
		type: String,
		minLength: 3
	})
	@IsNotEmpty()
	@IsString()
	@Length(3, 50)
	username: string

	@ApiProperty({
		description: 'Пароль пользователя',
		example: '12345678',
		type: String,
		minLength: 8
	})
	@IsNotEmpty()
	@IsString()
	@Length(8, 100)
	password: string

	@ApiProperty({
		description: 'Почта пользователя',
		example: 'test@example.com',
		type: String
	})
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string
}
