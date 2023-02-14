import { serverPatch } from "./serverPatch";
import { MessageI } from "./../types/MessageI";
export async function create(
  maxViews: number,
  author: string,
  message: string,
  password: string,
  isEditableByOther: boolean
): Promise<MessageI> {
  const postdata = {
    views: maxViews,
    author,
    message,
    password,
    isEditableByOther,
  };
  const response = await fetch(serverPatch + "/messages/create", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postdata),
  });
  return await response.json();
}
