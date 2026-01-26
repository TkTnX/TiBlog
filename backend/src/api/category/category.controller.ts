import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	UseGuards
} from '@nestjs/common'
import { ERole } from 'prisma/generated/enums'
import { CategoryRequest } from 'src/api/category/dto/CategoryRequest'
import { Roles } from 'src/decorators/roles.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'

import { CategoryService } from './category.service'

@Controller('categories')
export class CategoryController {
	public constructor(private readonly categoryService: CategoryService) {}

	@Get()
	public async getCategories() {
		return await this.categoryService.getCategories()
	}

	@Get('by-postId/:id')
	public async getCategoryByPostId(@Param('id') id: string) {
		return await this.categoryService.getCategoryByPostId(id)
	}

	@Post()
	public async createCategory(@Body() dto: CategoryRequest) {
		return await this.categoryService.createCategory(dto)
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles([ERole.ADMIN])
	@Delete(':id')
	public async deleteCategory(@Param('id') id: string) {
		return await this.categoryService.deleteCategory(id)
	}
}
