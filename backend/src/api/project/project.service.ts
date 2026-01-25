import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRequest } from 'src/api/project/dto/ProjectRequest';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

















@Injectable()
export class ProjectService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getProjects(query?: Record<string, string>) {
		console.log(query)
		// META
		const limit = Number(query?.limit) || 6
		const page = Number(query?.page) || 1
		const totalProjects = await this.prismaService.project.count()
		const totalPages = Math.ceil(totalProjects / limit)
		const projects = await this.prismaService.project.findMany({
			take: limit,
			skip: page === 1 ? 0 : limit * (page - 1)
		})

		if (!projects) throw new NotFoundException('Проекты не найдены!')
		return {
			items: projects,
			totalPages,
			totalProjects
		}
	}

	public async createProject(dto: ProjectRequest) {
		const newProject = await this.prismaService.project.create({
			data: {
				...dto,
				categories: {
					connect: dto.categories.map(id => ({ id }))
				}
			}
		})

		return newProject
	}
}
