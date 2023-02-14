import { ChangeI } from "../ChangeI";
import { MessageI } from "../MessageI";

export interface MessageCompI {
  message: MessageI;
  code: string;
  save: (e: ChangeI) => void;
  passwordLess: boolean;
}
