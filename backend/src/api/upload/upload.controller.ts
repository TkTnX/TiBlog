import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

import { UploadService } from './upload.service'
import { UploadResponse } from 'src/api/upload/dto'

@ApiTags('Загрузка файлов')
@Controller('uploads')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@ApiCreatedResponse({type: UploadResponse})
	@Post()
	@UseInterceptors(FileInterceptor('file'))
	public async uploadFile(@UploadedFile() file: Express.Multer.File) {
		return this.uploadService.upload(file)
	}
}
