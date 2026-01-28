import * as dotenv from "dotenv"
import { defineConfig } from "orval"

dotenv.config()

export default defineConfig({
	client: {
		input: process.env.NEXT_PUBLIC_OPENAPI_URL,
		output: {
			schemas: "./src/shared/types"
		}
	}
})
