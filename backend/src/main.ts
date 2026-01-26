import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import { join } from 'path'

import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	const config = new ConfigService()

	app.use(cookieParser())
	app.setGlobalPrefix('api')

	app.use('/uploads', express.static(join(process.cwd(), 'uploads')))
	app.useGlobalPipes(new ValidationPipe())

	app.enableCors({
		origin: config.getOrThrow<string>('CLIENT_URL').split(','),
		credentials: true
	})

	await app.listen(config.getOrThrow('SERVER_PORT'))
}
bootstrap()
