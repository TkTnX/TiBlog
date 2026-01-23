import { Controller, Get, UseGuards } from '@nestjs/common'
import { Authorized } from 'src/decorators/authorized.decorator'
import { AuthGuard } from 'src/guards/auth.guard'
import { RolesGuard } from 'src/guards/roles.guard'

import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard, RolesGuard)
	@Get('@me')
	public async getMe(@Authorized('userId') userId: string) {
		return this.userService.getMe(userId)
	}
}
