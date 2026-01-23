import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Injectable()
export class UserService {
	public constructor(private readonly prismaService: PrismaService) {}

	public async getMe(userId: string) {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId },
			include: { likes: true },
			omit: { password: true }
		})

		if (!user) throw new NotFoundException('Пользователь не найден')

		return user
	}
}
