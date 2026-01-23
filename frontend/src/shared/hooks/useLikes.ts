import { like } from "@/src/shared/api";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useLikes() {
    const likeMutation = (options?: Omit<UseMutationOptions<unknown, unknown, unknown>, "mutationKey" | "mutationFn">) => useMutation({
        mutationKey: ["like"],
        mutationFn: (postId: string) => like(postId),
        ...options
    })

    return {likeMutation}
}