import { Request, Response } from "express";
import messageDto from "../dto/messageDto";
import messageModel from "../models/message";
import bcrypt from "bcrypt";
import generateCode from "../utils/generateCode";
import crypt from "../utils/hashing";

const { encrypt } = crypt;

class messagesController {
  patches() {
    return {
      read: "/messages/read",
      create: "/messages/create",
      check: "/messages/check",
      change: "/messages/change",
    };
  }

  async change(req: Request, res: Response) {
    try {
      const { message, code, password } = req.body;

      if (!message || !code) {
        return res.status(403).json({ message: "don't valid data" });
      }

      const messageDB = await messageModel.findOne({ code });

      if (!messageDB) {
        return res.status(403).json({ message: "don't exist" });
      }

      let isCheck = false;
      if (typeof password === "string") {
        isCheck = await bcrypt.compare(password, messageDB.password!);
      } else {
        isCheck = await bcrypt.compare(
          process.env.PASSWORD_MESSAGE_DEFAULT!,
          messageDB.password!
        );
      }

      if (!isCheck) {
        return res.status(403).json({ message: "wrong password" });
      }
      messageDB.message = encrypt(message);
      await messageDB.save();
      const dto = messageDto(messageDB);
      return res.json(dto);
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Something wen't wrong" });
    }
  }

  async check(req: Request, res: Response) {
    try {
      const { code } = req.query;

      if (!code) {
        return res.status(403).json({ message: "don't valid data" });
      }
      const message = await messageModel.findOne({ code });
      if (!message) {
        return res.status(403).json({ exist: false, password: false });
      }

      const password = await bcrypt.compare(
        process.env.PASSWORD_MESSAGE_DEFAULT!,
        message.password!
      );

      return res.json({ exist: true, password });
    } catch (error) {
      return res.status(403).json({ message: "Something wen't wrong" });
    }
  }

  async read(req: Request, res: Response) {
    try {
      const { code, password } = req.query;

      if (!code) {
        return res.status(403).json({ message: "don't valid data" });
      }

      const message = await messageModel.findOne({ code });

      if (!message) {
        return res.status(403).json({ message: "can't find message" });
      }
      let isCheck = false;
      if (typeof password === "string") {
        isCheck = await bcrypt.compare(password, message.password!);
      } else {
        isCheck = await bcrypt.compare(
          process.env.PASSWORD_MESSAGE_DEFAULT!,
          message.password!
        );
      }
      if (!isCheck) {
        return res.status(403).json({ message: "wrong password" });
      }

      message.views = message.views! + 1;
      await message.save();
      console.log(message.views);
      if (message.maxViews! <= message.views) {
        console.log("deleted");
        setTimeout(async () => {
          await message.delete();
        }, 100);
      }

      const dto = messageDto(message);
      return res.json(dto);
    } catch (error) {
      return res.status(403).json({ message: "Something wen't wrong" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { message, password, author, isEditableByOther, views } = req.body;

      if (!message) {
        return res.status(403).json({ message: "don't valid data" });
      }

      const salt = await bcrypt.genSalt(+process.env.MESSAGE_SALT!);

      const passwordHash = await bcrypt.hash(
        password || process.env.PASSWORD_MESSAGE_DEFAULT!,
        salt
      );
      const messageHash = encrypt(message);

      let code = generateCode(6);
      let isCodeExist = true;

      while (isCodeExist) {
        const codeData = await messageModel.findOne({ code });
        if (!codeData) isCodeExist = false;
      }

      const messageData = await messageModel.create({
        author: author.length > 0 ? author : "Unknown",
        isEditableByOther,
        message: messageHash,
        password: passwordHash,
        maxViews: views,
        code,
        date: new Date().getTime(),
      });

      const dto = messageDto(messageData);
      console.log(dto);

      return res.json(dto);
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Something wen't wrong" });
    }
  }
}

export default { messagesController: new messagesController() };
