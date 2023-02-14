import Crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const bytes = +process.env.BYTES!;
const algorithm = process.env.ALGORITM;
const secretkey = process.env.SECRET_KEY;

const encrypt = (message: string) => {
  const iv = Crypto.randomBytes(bytes);
  const cipher = Crypto.createCipheriv(algorithm!, secretkey!, iv);

  const encrypted = Buffer.concat([cipher.update(message), cipher.final()]);
  return {
    iv: iv.toString("hex"),
    content: encrypted.toString("hex"),
  };
};

const decrypt = (hash: any) => {
  const decipher = Crypto.createDecipheriv(
    algorithm!,
    secretkey!,
    Buffer.from(hash.iv, "hex")
  );

  const decrpyted = Buffer.concat([
    decipher.update(Buffer.from(hash.content, "hex")),
    decipher.final(),
  ]);
  return decrpyted.toString();
};

export default { decrypt, encrypt };
