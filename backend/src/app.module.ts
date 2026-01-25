import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { PostModule } from './api/post/post.module'
import { PrismaModule } from './infrastructure/prisma/prisma.module'
import { CategoryModule } from './api/category/category.module';
import { CommentModule } from './api/comment/comment.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './api/auth/auth.module';
import { LikeModule } from './api/like/like.module';
import { ProjectModule } from './api/project/project.module';
import { UploadModule } from './api/upload/upload.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		PrismaModule,
		PostModule,
		CategoryModule,
		CommentModule,
		UserModule,
		AuthModule,
		LikeModule,
		ProjectModule,
		UploadModule,
	]
})
export class AppModule {}
