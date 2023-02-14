import { Express } from "express";
import messageRoutes from "./messageRoutes";

function GlobalRoutes(App: Express) {
  messageRoutes(App);
}

export default GlobalRoutes;
