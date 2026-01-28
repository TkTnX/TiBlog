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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ERole } from 'prisma/generated/enums'
import { CategoryRequest, CategoryResponse } from 'src/api/category/dto'
import { Roles } from 'src/decorators/roles.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'

import { CategoryService } from './category.service'

@ApiTags('Категории')
@Controller('categories')
export class CategoryController {
	public constructor(private readonly categoryService: CategoryService) {}

	@ApiOkResponse({ type: CategoryResponse, isArray: true })
	@Get()
	public async getCategories() {
		return await this.categoryService.getCategories()
	}

	@ApiOkResponse({ type: CategoryResponse })
	@Get('by-postId/:id')
	public async getCategoryByPostId(@Param('id') id: string) {
		return await this.categoryService.getCategoryByPostId(id)
	}

	@ApiOkResponse({ type: CategoryResponse })
	@Post()
	public async createCategory(@Body() dto: CategoryRequest) {
		return await this.categoryService.createCategory(dto)
	}

	@ApiOkResponse({ type: CategoryResponse })
	@UseGuards(AuthGuard, RolesGuard)
	@Roles([ERole.ADMIN])
	@Delete(':id')
	public async deleteCategory(@Param('id') id: string) {
		return await this.categoryService.deleteCategory(id)
	}
}
