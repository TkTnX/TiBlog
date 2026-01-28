import { ApiProperty } from '@nestjs/swagger'

export class AuthResponse {
	@ApiProperty({
		description: 'Access Токен',
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
		type: String
	})
	access_token: string
}
