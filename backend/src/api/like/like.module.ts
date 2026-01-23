import { Module } from '@nestjs/common'
import { AuthModule } from 'src/api/auth/auth.module'

import { LikeController } from './like.controller'
import { LikeService } from './like.service'
import { UserModule } from 'src/api/user/user.module'

@Module({
	imports: [AuthModule, UserModule],
	controllers: [LikeController],
	providers: [LikeService]
})
export class LikeModule {}
