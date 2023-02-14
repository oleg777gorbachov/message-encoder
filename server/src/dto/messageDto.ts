import crypt from "../utils/hashing";

const { decrypt, encrypt } = crypt;

function messageDto(message: any) {
  const {
    _id,
    __v,
    message: messageHash,
    password,
    ...messageData
  } = message._doc;
  const messageDecrypt = decrypt(messageHash);
  return { ...messageData, id: _id, message: messageDecrypt };
}

export default messageDto;
