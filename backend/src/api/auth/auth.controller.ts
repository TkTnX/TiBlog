import {
	Body,
	Controller,
	Post,
	Req,
	Res,
	UnauthorizedException
} from '@nestjs/common'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { Request, Response } from 'express'
import { AuthResponse, LoginRequest, RegisterRequest } from 'src/api/auth/dto'

import { AuthService } from './auth.service'

@ApiTags('Аутентификация')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiCreatedResponse({
		type: AuthResponse
	})
	@Post('register')
	public async register(@Res() res: Response, @Body() dto: RegisterRequest) {
		return this.authService.register(res, dto)
	}

	@ApiCreatedResponse({
		type: AuthResponse
	})
	@Post('login')
	public async login(@Res() res: Response, @Body() dto: LoginRequest) {
		return this.authService.login(res, dto)
	}

	@ApiCreatedResponse({
		type: AuthResponse
	})
	@Post('refresh')
	public async refresh(@Req() req: Request, @Res() res: Response) {
		const refreshToken = req.cookies.refreshToken

		if (!refreshToken) {
			throw new UnauthorizedException('Нет токена')
		}

		return this.authService.refreshTokens(res, refreshToken)
	}
}
