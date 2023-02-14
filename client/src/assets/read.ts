import { serverPatch } from "./serverPatch";
import { MessageI } from "./../types/MessageI";
export async function read(code: string, password?: string): Promise<MessageI> {
  const query = new URLSearchParams({
    code,
  });
  if (password) {
    query.append("password", password);
  }
  const response = await fetch(serverPatch + "/messages/read?" + query, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}
