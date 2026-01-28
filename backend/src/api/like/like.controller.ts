import { Controller, Param, Post, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { LikeResponse } from 'src/api/like/dto'
import { Authorized } from 'src/decorators/authorized.decorator'
import { AuthGuard } from 'src/guards/auth.guard'

import { LikeService } from './like.service'

@ApiTags('Лайки')
@Controller('likes')
export class LikeController {
	public constructor(private readonly likeService: LikeService) {}

	@ApiCreatedResponse({ type: LikeResponse })
	@UseGuards(AuthGuard)
	@Post(':postId')
	public async like(
		@Param('postId') postId: string,
		@Authorized('userId') userId: string
	) {
		return await this.likeService.like(postId, userId)
	}
}
