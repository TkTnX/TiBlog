import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Query,
	UseGuards
} from '@nestjs/common'
import { ERole } from 'prisma/generated/enums'
import { PostRequest } from 'src/api/post/dto/PostRequest'
import { Roles } from 'src/decorators/roles.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'

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

	@UseGuards(AuthGuard, RolesGuard)
	@Roles([ERole.ADMIN])
	@Post()
	public async createPost(@Body() dto: PostRequest) {
		return await this.postService.createPost(dto)
	}
}
