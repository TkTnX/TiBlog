import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Injectable()
export class PostService {
	public constructor(private readonly prismaService: PrismaService) {}
	private logger = new Logger(PostService.name)

	public async getPosts(query?: Record<string, string>) {
		const { limit, page, ...restQuery } = query || {}

		// META
		const postsCount = await this.prismaService.post.count()
		const currPage = page || 1
		const totalPages = Math.floor(postsCount / Number(limit) || 6)

		const posts = await this.prismaService.post.findMany({
			where: restQuery,
			take: Number(limit) || 6,
			include: { categories: true },
			orderBy: { createdAt: 'asc' }
		})

		if (!posts || posts.length === 0)
			throw new NotFoundException('Посты не найдены!')

		return { items: posts, totalPages, page: currPage }
	}

	public async getPostById(postId: string) {
		try {
			const post = await this.prismaService.post.findUnique({
				where: { id: postId }
			})

			if (!post) throw new NotFoundException('Пост не найден!')

			return post
		} catch (error) {
			console.log(error)
			this.logger.error('Error fetching post!')
		}
	}
}
