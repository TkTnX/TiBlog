import { BadGatewayException, Injectable } from '@nestjs/common'
import { CommentRequest } from 'src/api/comment/dto'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Injectable()
export class CommentService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async create(postId: string, dto: CommentRequest) {
		const comment = await this.prismaService.comment.create({
			data: {
				postId,
			...dto
		} })

		if (!comment)
			throw new BadGatewayException(
				'Что-то пошло не так при создании комментария'
			)

		return comment
	}
}
