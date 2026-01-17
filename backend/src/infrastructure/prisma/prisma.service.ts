import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'prisma/generated/client'

@Injectable()
export class PrismaService
	extends PrismaClient
	implements OnModuleDestroy, OnModuleInit
{
	private logger = new Logger(PrismaService.name)

	public constructor(private readonly configService: ConfigService) {
		const adapter = new PrismaPg({
			connectionString: configService.getOrThrow('DATABASE_URL')
		})

		super({ adapter })
	}

	async onModuleInit() {
		try {
			this.logger.log('Connecting to the DB')

			await this.$connect()

			this.logger.log('DB Successfully connected!')
		} catch (error) {
			this.logger.error(`Connecting error: ${error}`)

			throw error
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
