import { IsNotEmpty, IsString, Length } from 'class-validator';







export class ProjectRequest {
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

	@IsNotEmpty()
	stack: string[]

	categories: string[]
}
