import { AxiosError } from "axios"

import { ErrorMessage } from "@/src/shared/components"

export function showErrorMessage(error: AxiosError | Error) {
	if (error instanceof AxiosError) {
		return <ErrorMessage text={error?.response?.data.message} />
	} else return <ErrorMessage text={error.message} />
}
