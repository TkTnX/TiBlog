import { IsNotEmpty, IsString } from 'class-validator'

export class CommentRequest {
	@IsNotEmpty()
	@IsString()
	text: string

	// user?: User
}
