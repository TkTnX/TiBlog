import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import * as argon from 'argon2'
import { Response } from 'express'
import { User } from 'prisma/generated/client'
import { LoginRequest, RegisterRequest } from 'src/api/auth/dto'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@Injectable()
export class AuthService {
	public constructor(
		private readonly prismaService: PrismaService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService
	) {}

	public async register(res: Response, dto: RegisterRequest) {
		const isEmailExists = await this.prismaService.user.findUnique({
			where: { email: dto.email }
		})

		if (isEmailExists) {
			throw new ConflictException('Почта уже существует')
		}

		const hashedPassword = await argon.hash(dto.password)

		const newUser = await this.prismaService.user.create({
			data: {
				...dto,
				password: hashedPassword
			}
		})

		return await this.auth(res, newUser)
	}

	public async login(res: Response, dto: LoginRequest) {
		const user = await this.prismaService.user.findUnique({
			where: { email: dto.email }
		})

		if (!user) throw new NotFoundException('Невенные почта или пароль')

		const isPasswordCorrect = await argon.verify(
			user.password,
			dto.password
		)

		if (!isPasswordCorrect)
			throw new NotFoundException('Неверные почта или пароль')

		return await this.auth(res, user)
	}

	private async generateTokens(user: User) {
		const payload = { userId: user.id, email: user.email, role: user.role }

		return {
			access_token: await this.jwtService.signAsync(payload, {
				expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_TTL')
			}),
			refresh_token: await this.jwtService.signAsync(payload, {
				expiresIn: this.configService.getOrThrow(
					'JWT_REFRESH_TOKEN_TTL'
				)
			})
		}
	}

	private async auth(res: Response, user: User) {
		const { access_token, refresh_token } = await this.generateTokens(user)

		res.cookie('refreshToken', refresh_token, {
			httpOnly: true,
			path: '/',
			domain: this.configService.getOrThrow('COOKIE_DOMAIN'),
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
		})

		return res.json({ access_token })
	}
}
