import { ApiProperty } from '@nestjs/swagger'

export class UploadResponse {
	@ApiProperty({
		description: 'URL изображения',
		example: 'https://randomimg.com/1',
		type: String
	})
	fileUrl: string
}
