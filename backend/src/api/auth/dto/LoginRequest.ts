import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";








export class LoginRequest {
	@ApiProperty({
		description: 'Почта пользователя',
		example: 'test@example.com',
		type: String
	})
	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string

	@ApiProperty({
		description: 'Пароль пользователя',
		example: '12345678',
        type: String,
        minLength: 8
	})
	@IsNotEmpty()
	@Length(8, 100)
	@IsString()
	password: string
}