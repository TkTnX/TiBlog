import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Injectable()
export class CategoryService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getCategoryByPostId(id: string) {
		const category = await this.prismaService.category.findFirst({
			where: {
				posts: {
					some: {
						id
					}
				}
			},
			include: {
				posts: {
					include: { categories: true },
					where: { id: { not: id } },
					take: 6
				}
			}
		})

		if (!category) throw new NotFoundException('Категория не найдена!')

		return category
	}
}
