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
import { ProjectRequest, ProjectResponse } from 'src/api/project/dto'
import { Roles } from 'src/decorators/roles.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'

import { ProjectService } from './project.service'

@ApiTags('Проекты')
@Controller('projects')
export class ProjectController {
	public constructor(private readonly projectService: ProjectService) {}

	@ApiOkResponse({ type: ProjectResponse, isArray: true })
	@Get()
	public async getProjects(@Query() query: Record<string, string>) {
		return this.projectService.getProjects(query)
	}

	@ApiCreatedResponse({ type: ProjectResponse })
	@UseGuards(AuthGuard, RolesGuard)
	@Roles([ERole.ADMIN])
	@Post()
	public async createProject(@Body() dto: ProjectRequest) {
		return await this.projectService.createProject(dto)
	}

	@ApiOkResponse({ type: ProjectResponse })
	@Get(':id')
	public async getProjectById(@Param('id') id: string) {
		return await this.projectService.getProjectById(id)
	}

	@ApiOkResponse({ type: ProjectResponse })
	@UseGuards(AuthGuard, RolesGuard)
	@Roles([ERole.ADMIN])
	@Delete(':id')
	public async deleteProject(@Param('id') id: string) {
		return await this.projectService.deleteProject(id)
	}
}
