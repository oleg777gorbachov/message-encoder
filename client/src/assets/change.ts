import { ChangeI } from "../types/ChangeI";
import { MessageI } from "./../types/MessageI";
import { serverPatch } from "./serverPatch";

export async function change({
  message,
  code,
  password,
}: ChangeI): Promise<MessageI> {
  const body = {
    message,
    code,
    password,
  };
  const response = await fetch(serverPatch + "/messages/change", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}
