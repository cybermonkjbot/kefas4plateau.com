import { handlePledgeApiRequest } from "../server/pledgeApi.js";

export default async function handler(request, response) {
  await handlePledgeApiRequest(request, response);
}
