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
import { ERole } from 'prisma/generated/enums'
import { ProjectRequest } from 'src/api/project/dto/ProjectRequest'
import { Roles } from 'src/decorators/roles.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'

import { ProjectService } from './project.service'

@Controller('projects')
export class ProjectController {
	public constructor(private readonly projectService: ProjectService) {}

	@Get()
	public async getProjects(@Query() query: Record<string, string>) {
		return this.projectService.getProjects(query)
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles([ERole.ADMIN])
	@Post()
	public async createProject(@Body() dto: ProjectRequest) {
		return await this.projectService.createProject(dto)
	}

	@Get(':id')
	public async getProjectById(@Param('id') id: string) {
		return await this.projectService.getProjectById(id)
	}

	@UseGuards(AuthGuard, RolesGuard)
	@Roles([ERole.ADMIN])
	@Delete(':id')
	public async deleteProject(@Param('id') id: string) {
		return await this.projectService.deleteProject(id)
	}
}
