import to from "await-to-js";
import apiInstance from "@/lib/axios";
import { AxiosResponse } from "axios";
import { Chat } from "@prisma/client";
import { CommonResponse } from "@/types";

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
