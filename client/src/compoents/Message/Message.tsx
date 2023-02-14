import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { dateToString } from "../../assets/dateToString";
import { MessageCompI } from "../../types/components/MessageCompI";
import Modal from "../Modal/Modal";

function Message({ message, code, save, passwordLess }: MessageCompI) {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isSave, setIsSave] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");
  const [newmessage, setNewmessage] = useState<string>("");
  const {
    author,
    date,
    isEditableByOther,
    maxViews,
    message: text,
    views,
  } = message;
  const { t } = useTranslation();

  const passwordHanlder = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const messageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewmessage(e.target.value);
  };

  const editHandler = () => {
    if (isEditableByOther) {
      if (isEdit) {
        setIsEdit(false);
        setNewmessage("");
      } else {
        setIsEdit(true);
      }
    }
  };

  const saveHandler = () => {
    if (newmessage.length > 0) {
      if (passwordLess) {
        save({ code, message: newmessage });
        setIsSave(false);
        setIsEdit(false);
        setPassword("");
        setNewmessage("");
      } else {
        setIsSave(true);
      }
    }
  };

  const saveAction = async () => {
    if (isEditableByOther && newmessage.length > 0 && password.length > 0) {
      if (passwordLess) {
        save({ code, message: newmessage });
      } else {
        save({ code, message: newmessage, password });
      }
      setIsSave(false);
      setIsEdit(false);
      setPassword("");
      setNewmessage("");
    }
  };

  return (
    <>
      <div>
        <div className="container">
          <h3>
            {t("messageAuthor")} {author}
          </h3>
          {isEditableByOther && views !== maxViews && (
            <button onClick={editHandler}>{t("messageEdit")}</button>
          )}
        </div>
        {isEdit ? (
          <div className="edit">
            <textarea
              value={newmessage}
              placeholder={t("messageNewMessage")!}
              onChange={messageHandler}
            ></textarea>
            <button onClick={saveHandler}>{t("messageSave")}</button>
          </div>
        ) : (
          <div className="message">{text}</div>
        )}

        <div>
          <p>
            {t("messageViews")} {views}
          </p>
          <p>
            {t("messageMaxViews")} {maxViews}
          </p>
        </div>
        <div>
          {t("messageDate")} {dateToString(date)}
        </div>
      </div>
      <Modal state={isSave} closeAction={() => setIsSave(false)}>
        <div className="edit">
          <input
            placeholder={t("createPassword")!}
            value={password}
            onChange={passwordHanlder}
          ></input>
          <button onClick={saveAction} style={{ color: "white" }}>
            {t("messageSave")}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Message;
