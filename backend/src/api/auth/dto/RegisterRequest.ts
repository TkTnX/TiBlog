import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'

export class RegisterRequest {
	@IsNotEmpty()
	@IsString()
	@Length(3, 50)
	username: string

	@IsNotEmpty()
	@IsString()
	@Length(8, 100)
	password: string

	@IsNotEmpty()
	@IsEmail()
	@IsString()
	email: string
}
