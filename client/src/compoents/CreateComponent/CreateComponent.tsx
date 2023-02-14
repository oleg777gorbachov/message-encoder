import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { create } from "../../assets/create";
import Modal from "../Modal/Modal";

function CreateComponent() {
  const [author, setAuthor] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [maxViews, setMaxViews] = useState(1);
  const [isShowPass, setIsShowPass] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const [code, setCode] = useState("");
  const [isCreate, setIsCreate] = useState(false);
  const [timer, setTimer] = useState(0);

  const { t } = useTranslation();

  const messageHanlder = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const authorHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const passwordHanlder = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const maxViewsHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;
    if (!isNaN(value)) {
      setMaxViews(value);
    }
  };

  const showPassHanlder = (e: ChangeEvent<HTMLInputElement>) => {
    setIsShowPass(e.target.checked);
  };

  const editHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEditable(e.target.checked);
  };

  const finishEvent: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();

    if (message.length <= 0) {
      return;
    }

    const data = await create(maxViews, author, message, password, isEditable);
    setMessage("");
    setPassword("");
    setAuthor("");
    setMaxViews(1);
    setIsEditable(false);
    setCode(data.code);
    setIsCreate(true);
    setTimer(3);
  };

  useEffect(() => {
    let interval = setInterval(() => {}, 100);
    interval = setInterval(() => {
      if (timer >= 0) {
        clearInterval(interval);
      }
      if (0 < timer) {
        setTimer((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, [timer]);

  const closeAction = () => {
    if (timer > 0) {
      setTimeout(() => setIsCreate(false), 1000);
    } else {
      setIsCreate(false);
    }
  };

  return (
    <>
      <h2>{t("create")}</h2>
      <form>
        <label>
          <input
            type={"text"}
            placeholder={t("createAuthor")!}
            value={author}
            onChange={authorHandler}
          />
        </label>
        <div className="separator"></div>
        <textarea
          placeholder={t("createMessage")!}
          value={message}
          onChange={messageHanlder}
        ></textarea>
        <div className="separator"></div>
        <label>
          <input
            type={!isShowPass ? "password" : "text"}
            placeholder={t("createPassword")!}
            value={password}
            onChange={passwordHanlder}
          />
        </label>
        <label>
          {t("createShowPass")}
          <input
            type={"checkbox"}
            checked={isShowPass}
            onChange={showPassHanlder}
          />
        </label>
        <div className="separator"></div>

        <label className="views">
          {t("createMaxViews")}
          <input
            type={"text"}
            placeholder={t("createMaxViews")!}
            value={maxViews}
            onChange={maxViewsHandler}
          />
        </label>
        <div className="separator"></div>
        <label>
          {t("createEdit")}
          <input
            type={"checkbox"}
            checked={isEditable}
            onChange={editHandler}
          />
        </label>
        <button onClick={finishEvent}>{t("createbtn")}</button>
      </form>
      <Modal state={isCreate} closeAction={closeAction}>
        <div className="modal-code">
          <h3>
            {t("code")} <em>{code}</em>
          </h3>
          <button
            style={{ color: "white" }}
            disabled={Boolean(timer)}
            onClick={closeAction}
          >
            {timer || t("close")}
          </button>
        </div>
      </Modal>
    </>
  );
}

export default CreateComponent;
