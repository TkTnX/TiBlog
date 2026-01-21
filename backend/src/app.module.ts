import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PostModule } from './api/post/post.module'
import { PrismaModule } from './infrastructure/prisma/prisma.module'
import { CategoryModule } from './api/category/category.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		PrismaModule,
		PostModule,
		CategoryModule
	]
})
export class AppModule {}
