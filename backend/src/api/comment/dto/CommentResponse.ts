import { ApiProperty } from "@nestjs/swagger";
import { UserResponse } from "src/api/user/dto";













export class CommentResponse {
	@ApiProperty({
		description: 'ID комментария',
		example: '220dea69-0cb5-47ff-a580-7d0a28498394',
		type: String
	})
	id: string

	@ApiProperty({
		description: 'Текст комментария',
		example: 'Lorem ipsum...',
		type: String
	})
	text: string

	@ApiProperty({
		description: 'ID поста',
		example: '220dea69-0cb5-47ff-a580-7d0a28498394',
		type: String
	})
	postId: string

	@ApiProperty({
		description: 'Пользователь',
		example: { id: '220dea69-0', username: "John Doe" },
		type: UserResponse
	})
	user: UserResponse

	@ApiProperty({
		description: 'ID пользователя',
		example: '220dea69-0cb5-47ff-a580-7d0a28498394',
		type: String
	})
	userId: string
}