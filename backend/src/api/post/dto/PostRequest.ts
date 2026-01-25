import { IsNotEmpty, IsString, Length } from 'class-validator'

export class PostRequest {
	@IsString()
	@IsNotEmpty()
	content: string

	@IsString()
	@IsNotEmpty()
	preview: string

	@IsString()
	@IsNotEmpty()
	@Length(3, 50)
    title: string
    
	categories: string[]
}
