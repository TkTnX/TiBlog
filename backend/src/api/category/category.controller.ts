import { Controller, Get, Param } from '@nestjs/common'

import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
	public constructor(private readonly categoryService: CategoryService) {}

	@Get('by-postId/:id')
	public async getCategoryByPostId(@Param('id') id: string) {
		const category = await this.categoryService.getCategoryByPostId(id)

		return category
	}
}
