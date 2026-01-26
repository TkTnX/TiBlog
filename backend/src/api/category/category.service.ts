import {
	BadGatewayException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { CategoryRequest } from 'src/api/category/dto/CategoryRequest'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Injectable()
export class CategoryService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getCategories() {
		const categories = await this.prismaService.category.findMany()

		if (!categories) throw new NotFoundException('Категории не найдены')
		return categories
	}

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

	public async createCategory(dto: CategoryRequest) {
		const category = await this.prismaService.category.create({ data: dto })

		if (!category)
			throw new BadGatewayException(
				'Что-то пошло не так при создании категории'
			)

		return category
	}

	public async deleteCategory(id: string) {
		const category = await this.getCategoryById(id)

		return await this.prismaService.category.delete({
			where: { id: category.id }
		})
	}

	private async getCategoryById(id: string) {
		const category = await this.prismaService.category.findUnique({
			where: { id }
		})

		if (!category) throw new NotFoundException('Категория не найдена')

		return category
	}
}
