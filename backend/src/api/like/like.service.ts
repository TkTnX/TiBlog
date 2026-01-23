import { Injectable } from '@nestjs/common'
import { UserService } from 'src/api/user/user.service'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Injectable()
export class LikeService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService
	) {}

	public async like(postId: string, userId: string) {
		const user = await this.userService.getMe(userId)

		const isLiked = await this.prismaService.like.findFirst({
			where: {
				AND: [{ userId: user.id }, { postId }]
			}
		})

		if (isLiked) {
			await this.prismaService.like.delete({ where: { id: isLiked.id } })
		} else {
			await this.prismaService.like.create({ data: { postId, userId } })
		}

		return 'Успешно!'
	}
}
