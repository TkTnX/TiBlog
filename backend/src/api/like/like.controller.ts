import { Controller, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/guards/auth.guard'

import { LikeService } from './like.service'
import { Authorized } from 'src/decorators/authorized.decorator'
import { ApiTags } from '@nestjs/swagger'

@ApiTags("Лайки")
@Controller('likes')
export class LikeController {
	public constructor(private readonly likeService: LikeService) {}

	@UseGuards(AuthGuard)
	@Post(':postId')
  public async like(@Param('postId') postId: string, @Authorized("userId") userId: string) {
    return await this.likeService.like(postId, userId)
  }
}
