import { handleAccountApiRequest } from "../../server/accountApi.js";

export default async function handler(request, response) {
  await handleAccountApiRequest(request, response);
}
