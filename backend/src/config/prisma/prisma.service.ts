import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { PrismaClient } from 'prisma/generated/prisma/client'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleDestroy, OnModuleInit
{
	private logger = new Logger(PrismaService.name)
	async onModuleInit() {
		try {
			this.logger.log('Connecting to the DB')

			await this.$connect()

			this.logger.log('DB Successfully connected!')
		} catch (error) {
			this.logger.error(`Connecting error: ${error}`)
		}
	}

	async onModuleDestroy() {
		try {
			this.logger.log('Disconnecting from the DB')

			await this.$disconnect()
		} catch (error) {
			this.logger.error(`Disconnecting error: ${error}`)
		}
	}
}
