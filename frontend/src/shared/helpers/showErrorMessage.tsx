import { ErrorMessage } from "@/src/shared/components"
import { AxiosError } from "axios"


export function showErrorMessage(error: AxiosError | Error) {
	if (error instanceof AxiosError) {
		return <ErrorMessage text={error?.response?.data.message} />
	} else return <ErrorMessage text={error.message} />
}
