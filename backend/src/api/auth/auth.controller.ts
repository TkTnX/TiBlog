import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { ERole } from 'prisma/generated/enums'
import { LoginRequest, RegisterRequest } from 'src/api/auth/dto'
import { Roles } from 'src/decorators/roles.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	public async register(@Res() res: Response, @Body() dto: RegisterRequest) {
		return this.authService.register(res, dto)
	}

	@Post('login')
	public async login(@Res() res: Response, @Body() dto: LoginRequest) {
		return this.authService.login(res, dto)
	}

	// @UseGuards(AuthGuard, RolesGuard)
	// @Roles([ERole.ADMIN])
	// @Get('me')
	// public async getMe() {
	// 	return 'YOU GOT ME!'
	// }
}
