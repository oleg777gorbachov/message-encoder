import { CheckI } from "./../types/CheckI";
import { serverPatch } from "./serverPatch";

export async function check(code: string): Promise<CheckI> {
  const response = await fetch(
    serverPatch +
      "/messages/check?" +
      new URLSearchParams({
        code,
      }),
    {
      method: "GET",
    }
  );
  const data = await response.json();

  return data;
}
