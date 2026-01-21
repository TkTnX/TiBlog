import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Injectable()
export class PostService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getPosts(query?: Record<string, string>) {
		// META
		const {
			limit: queryLimit,
			page: queryPage,
			sortBy: querySort,
			...restQuery
		} = query || {}
		const sortBy = querySort?.split(':') || ['createdAt', 'desc']
		let orderBy: any

		if (sortBy[0] === 'likes') {
			orderBy = {
				likes: {
					_count: sortBy[1]
				}
			}
		} else {
			orderBy = {
				[sortBy[0]]: sortBy[1]
			}
		}

		const postsCount = await this.prismaService.post.count()
		const limit = Number(queryLimit) || 6
		const page = queryPage || 1
		const totalPages = Math.ceil(postsCount / Number(limit || 6))
		const posts = await this.prismaService.post.findMany({
			where: restQuery,
			take: limit,
			skip: (Number(page) - 1) * limit,
			include: { categories: true, likes: true },
			orderBy
		})

		if (!posts || posts.length === 0)
			throw new NotFoundException('Посты не найдены!')

		return { items: posts, totalPages, page }
	}

	public async getPostById(postId: string) {
		const post = await this.prismaService.post.update({
			where: { id: postId },
			data: {
				views: {
					increment: 1
				}
			},
			include: {
				_count: {
					select: {
						likes: true
					}
				},
				comments: true
			}
		})

		if (!post) throw new NotFoundException('Пост не найден!')

		return post
	}
}
