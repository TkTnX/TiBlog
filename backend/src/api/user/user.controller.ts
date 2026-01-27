import { Controller, Get, UseGuards } from '@nestjs/common'
import { Authorized } from 'src/decorators/authorized.decorator'
import { AuthGuard } from 'src/guards/auth.guard'

import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags("Пользователи")
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(AuthGuard)
	@Get('@me')
	public async getMe(@Authorized('userId') userId: string) {
		return this.userService.getMe(userId)
	}
}
