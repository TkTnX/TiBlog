import {
	Body,
	Controller,
	Post,
	Req,
	Res,
	UnauthorizedException
} from '@nestjs/common'
import { ApiHeader, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { LoginRequest, RegisterRequest } from 'src/api/auth/dto'

import { AuthService } from './auth.service'

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiHeader({
		name: 'Регистрация',
		description: 'Регистрация нового пользователя на сайте'
	})
	@Post('register')
	public async register(@Res() res: Response, @Body() dto: RegisterRequest) {
		return this.authService.register(res, dto)
	}

	@Post('login')
	public async login(@Res() res: Response, @Body() dto: LoginRequest) {
		return this.authService.login(res, dto)
	}

	@Post('refresh')
	public async refresh(@Req() req: Request, @Res() res: Response) {
		const refreshToken = req.cookies.refreshToken

		if (!refreshToken) {
			throw new UnauthorizedException('Нет токена')
		}

		return this.authService.refreshTokens(res, refreshToken)
	}
}
