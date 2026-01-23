import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CommentRequest {
	@IsNotEmpty()
	@IsString()
	text: string

	@IsOptional()
	userId?: string
}
