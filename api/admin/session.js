import { handleAdminApiRequest } from "../../server/adminApi.js";

export default async function handler(request, response) {
  await handleAdminApiRequest(request, response);
}
