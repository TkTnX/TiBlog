import { Controller, Get, Param, Query } from '@nestjs/common'

import { PostService } from './post.service'

@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Get()
	public async getPosts(@Query() query?: Record<string, string>) {
		return await this.postService.getPosts(query)
	}

	@Get(':postId')
	public async getPostById(@Param('postId') postId: string) {
		return await this.postService.getPostById(postId)
	}
}
