import { Controller, Get, Query } from '@nestjs/common'

import { ProjectService } from './project.service'

@Controller('projects')
export class ProjectController {
	public constructor(private readonly projectService: ProjectService) {}

	@Get()
	public async getProjects(@Query() query?: Record<string, string>) {
		console.log(query)
		return this.projectService.getProjects(query)
	}
}
