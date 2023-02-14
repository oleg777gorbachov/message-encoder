import { Express } from "express";
import messagesController from "../controllers/messagesController";

function messageRoutes(App: Express) {
  const controller = messagesController.messagesController;

  App.get(controller.patches().read, controller.read);
  App.get(controller.patches().check, controller.check);
  App.post(controller.patches().create, controller.create);
  App.post(controller.patches().change, controller.change);
}

export default messageRoutes;
