import { toast } from "sonner";

type AsyncFunction<P, R> = (params: P) => Promise<R>;


export function withErrorHandling<P, R>(fn: AsyncFunction<P, R>): AsyncFunction<P, R> {
  return async function (params: P): Promise<R> {
    try {
      return await fn(params);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error('An unexpected error occurred:', error);
      }
      throw error;
    }
  };
}
