export interface CommonResponse<T> {
  result: T;
  status: number;
}

export interface ChatMessageItem {
  id?: string;
  role: "assistant" | "user";
  content: string;
  createdAt: Date;
}
