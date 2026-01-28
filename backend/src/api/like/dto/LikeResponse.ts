import { ApiProperty } from "@nestjs/swagger";

export class LikeResponse {
	@ApiProperty({
		example: 'Успешно!',
		type: String
	})
	message: "Успешно"
}
