import { Injectable, NotFoundException } from '@nestjs/common'
import { ProjectWhereInput } from 'prisma/generated/models'
import { ProjectRequest } from 'src/api/project/dto/ProjectRequest'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Injectable()
export class ProjectService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getProjects(query: Record<string, string>) {
		const { limit: limitQuery, page: pageQuery, ...restQuery } = query
		// META
		const limit = Number(limitQuery) || 6
		const page = Number(pageQuery) || 1
		let where: ProjectWhereInput = restQuery
		if ('categories' in restQuery) {
			where = {
				categories: {
					some: {
						id: {
							in: restQuery.categories.split(',')
						}
					}
				}
			}
		}

		const totalProjects = await this.prismaService.project.count()
		const totalPages = Math.ceil(totalProjects / limit)
		const projects = await this.prismaService.project.findMany({
			take: limit,
			skip: page === 1 ? 0 : limit * (page - 1),
			orderBy: { createdAt: 'desc' },
			include: { categories: true },
			where
		})

		if (!projects) throw new NotFoundException('Проекты не найдены!')
		return {
			items: projects,
			totalPages,
			totalProjects
		}
	}

	public async getProjectById(id: string) {
		const project = await this.prismaService.project.findUnique({
			where: { id },
			include: { categories: true }
		})

		if (!project) throw new NotFoundException('Проект не найден!')

		return project
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

	public async deleteProject(id: string) {
		const project = await this.getProjectById(id)

		return await this.prismaService.project.delete({
			where: { id: project.id }
		})
	}
}
