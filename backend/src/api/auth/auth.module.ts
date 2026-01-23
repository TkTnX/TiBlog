import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				secret: configService.getOrThrow('JWT_SECRET')
			}),
			inject: [ConfigService]
		})
	],
	controllers: [AuthController],
	providers: [AuthService],
	exports: [JwtModule]
})
export class AuthModule {}
