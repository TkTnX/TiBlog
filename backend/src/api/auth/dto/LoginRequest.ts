import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"

export class LoginRequest {
    @IsNotEmpty()
    @IsEmail()
        @IsString()
    email: string

    @IsNotEmpty()
    @Length(8, 100)
        @IsString()
    password: string
}