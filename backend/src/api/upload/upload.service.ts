import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { randomUUID } from 'crypto'
import * as fs from 'fs'
import * as path from 'path'

@Injectable()
export class UploadService {
	public constructor(private readonly configService: ConfigService) {}

	public async upload(file: Express.Multer.File) {
		const uploadDir = path.join(process.cwd(), 'uploads')
		const fileName = `${randomUUID()}.${file.originalname.split('.')[1]}`
		const filePath = path.join(uploadDir, fileName)
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true })
		}

		fs.writeFileSync(filePath, file.buffer)

		const fileUrl = `${this.configService.getOrThrow('HTTP_URL')}/uploads/${fileName}`

		return fileUrl
	}
}
