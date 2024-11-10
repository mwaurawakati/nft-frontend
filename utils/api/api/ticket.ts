import {AxiosResponse} from "axios";
import apiService, {Ticketresponse} from "./api";




// Everyting relating to messaging the chatbot
export const CreateTicket = async (data): Promise<Ticketresponse> => {
  return await apiService.createticket(
    `ticket/create/`,data
  )
}
