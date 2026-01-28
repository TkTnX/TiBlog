import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Query,
	UseGuards
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ERole } from 'prisma/generated/enums'
import { PostRequest, PostResponse } from 'src/api/post/dto'
import { Roles } from 'src/decorators/roles.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'

import { PostService } from './post.service'

@ApiTags('Посты')
@Controller('posts')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@ApiOkResponse({ type: PostResponse, isArray: true })
	@Get()
	public async getPosts(@Query() query?: Record<string, string>) {
		return await this.postService.getPosts(query)
	}

	@ApiOkResponse({ type: PostResponse })
	@Get(':postId')
	public async getPostById(@Param('postId') postId: string) {
		return await this.postService.getPostById(postId)
	}

	@ApiCreatedResponse({ type: PostResponse })
	@UseGuards(AuthGuard, RolesGuard)
	@Roles([ERole.ADMIN])
	@Post()
	public async createPost(@Body() dto: PostRequest) {
		return await this.postService.createPost(dto)
	}

	@ApiOkResponse({ type: PostResponse })
	@UseGuards(AuthGuard, RolesGuard)
	@Roles([ERole.ADMIN])
	@Delete(':id')
	public async deleteProject(@Param('id') id: string) {
		return await this.postService.deletePost(id)
	}
}
