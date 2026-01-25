import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';



import { UploadService } from './upload.service';












@Controller('uploads')
export class UploadController {
	constructor(private readonly uploadService: UploadService) {}

	@Post()
	@UseInterceptors(FileInterceptor('file'))
	public async uploadFile(@UploadedFile() file: Express.Multer.File) {
		return this.uploadService.upload(file)
	}
}
