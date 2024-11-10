import {AxiosResponse} from "axios";
import apiService, {Chatbotresponse} from "./api";

// Everything related to registering the bot
export const registerBot = async (
  user_id: string,
): Promise<Chatbotresponse> => {
  return await apiService.chatbotget(
    `bot/register/${user_id}`
  );
};


// Everything relating to fetching the user's conversation with the bot
export const getConversations = async (): Promise<Chatbotresponse> => {
  return await apiService.H_chatbotget(
    `bot/profile/`
  )
}


// Everyting relating to messaging the chatbot
export const MessageBot = async (message): Promise<Chatbotresponse> => {
  console.log('message is ')
  return await apiService.H_chatbotpost(
    `bot/chat/`,message
  )
}
