import { Controller, Get, UseGuards } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { UserResponse } from 'src/api/user/dto'
import { Authorized } from 'src/decorators/authorized.decorator'
import { AuthGuard } from 'src/guards/auth.guard'

import { UserService } from './user.service'

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@ApiOkResponse({ type: UserResponse })
	@UseGuards(AuthGuard)
	@Get('@me')
	public async getMe(@Authorized('userId') userId: string) {
		return this.userService.getMe(userId)
	}
}
