import { Body, Controller, Param, Post } from '@nestjs/common'
import { CommentRequest, CommentResponse } from 'src/api/comment/dto'

import { CommentService } from './comment.service'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

@ApiTags("Комментарии")
@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@ApiCreatedResponse({type: CommentResponse })
	@Post(':postId')
	public async create(
		@Body() dto: CommentRequest,
		@Param('postId') postId: string
	) {
		return await this.commentService.create(postId, dto)
	}
}

