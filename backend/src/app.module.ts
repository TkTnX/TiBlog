import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PostModule } from './api/post/post.module'
import { PrismaModule } from './infrastructure/prisma/prisma.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		PrismaModule,
		PostModule
	]
})
export class AppModule {}
