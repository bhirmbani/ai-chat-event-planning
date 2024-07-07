import to from "await-to-js";
import { AxiosResponse } from "axios";
import { Chat } from "@prisma/client";
import { ChatMessageItem, CommonResponse } from "@/types";
import apiInstance from "@/lib/axios";

export const getChats = async (userId: string) => {
  const api = (await apiInstance).get("/chats", {
    params: {
      userId,
    },
  });

  const [err, data] = await to<AxiosResponse<CommonResponse<Chat[] | []>>>(api);

  const dataData = data?.data;

  return {
    err,
    data: dataData,
  };
};

export const createNewChat = async (userId: string) => {
  const api = (await apiInstance).post("/chats", { userId });

  const [err, data] = await to<AxiosResponse<CommonResponse<Chat>>>(api);

  const dataData = data?.data;

  return {
    err,
    data: dataData,
  };
};

export const getChatDetail = async (chatId: string) => {
  const api = (await apiInstance).get(`/chats/${chatId}`);

  const [err, data] = await to<AxiosResponse<CommonResponse<Chat>>>(api);

  const dataData = data?.data;

  return {
    err,
    data: dataData,
  };
};

export interface SendMessageProps {
  chatId: string;
  message: string;
  role: "user" | "assistant";
}

export const sendMessage = async (
  url: string,
  { arg }: { arg: SendMessageProps }
) => {
  const api = (await apiInstance).post(url, arg);

  const [err, data] = await to<AxiosResponse<CommonResponse<Chat>>>(api);

  const dataData = data?.data;

  return {
    err,
    data: dataData,
  };
};

export interface UpdateMessageProps {
  chatId: string;
  messages: ChatMessageItem[];
  latestMessage: string;
}

export const updateMessage = async (
  url: string,
  { arg }: { arg: UpdateMessageProps }
) => {
  const api = (await apiInstance).put(url, arg);

  const [err, data] = await to<AxiosResponse<CommonResponse<Chat>>>(api);

  const dataData = data?.data;

  return {
    err,
    data: dataData,
  };
};