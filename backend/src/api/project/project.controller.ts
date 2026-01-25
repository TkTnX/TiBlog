import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'

import { ProjectService } from './project.service'
import { AuthGuard } from 'src/guards/auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'
import { ERole } from 'prisma/generated/enums'
import { Roles } from 'src/decorators/roles.decorator'
import { ProjectRequest } from 'src/api/project/dto/ProjectRequest'

@Controller('projects')
export class ProjectController {
	public constructor(private readonly projectService: ProjectService) {}

	@Get()
	public async getProjects(@Query() query?: Record<string, string>) {
		console.log(query)
		return this.projectService.getProjects(query)
	}

		@UseGuards(AuthGuard, RolesGuard)
		@Roles([ERole.ADMIN])
		@Post()
		public async createProject(@Body() dto: ProjectRequest) {
			return await this.projectService.createProject(dto)
		}
}
