import {
  ChangeEvent,
  FormEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { change } from "../assets/change";
import { check } from "../assets/check";
import { read } from "../assets/read";
import MainContainer from "../compoents/MainContainer/MainContainer";
import Message from "../compoents/Message/Message";
import { ChangeI } from "../types/ChangeI";
import { MessageI } from "../types/MessageI";

function MessagePage() {
  const [isExist, setIsExist] = useState(true);
  const [isPasswordless, setIsPasswordless] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isViewing, setIsViewing] = useState(false);

  const [message, setMessage] = useState<MessageI | null>(null);
  const [password, setPassword] = useState("");

  const { pathname } = useLocation();

  const code = pathname.replace("/message/", "");
  const { t } = useTranslation();

  const passwordHanlder = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    check(code).then((e) => {
      setIsExist(e.exist);
      setIsPasswordless(e.password);
      setIsLoading(false);
    });
  }, [code]);

  useEffect(() => {
    if (isPasswordless && isViewing) {
      read(code).then((e) => setMessage(e));
    }
  }, [isPasswordless, password, isViewing]);

  const finishAction: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(code, password);
    read(code, password).then((e) => {
      if (e.author) {
        setMessage(e);
      }
      setPassword("");
    });
  };

  const viewAction = () => {
    setIsViewing(true);
  };

  const saveAction = (data: ChangeI) => {
    change(data).then((e) => setMessage(e));
  };

  const messageContent = useMemo(() => {
    if (!isExist) {
      return t("pageisntexist");
    }
    if (!isViewing) {
      return (
        <div className="view">
          <button onClick={viewAction}>{t("view")}</button>
        </div>
      );
    }
    if (isPasswordless) {
      if (!message) {
        return <div className="view">{t("loading")}</div>;
      }

      return (
        <Message
          message={message}
          code={code}
          save={saveAction}
          passwordLess={isPasswordless}
        />
      );
    } else {
      if (message) {
        return (
          <Message
            message={message}
            code={code}
            save={saveAction}
            passwordLess={isPasswordless}
          />
        );
      }

      return (
        <div className="view">
          <h3>{t("passwordToMessage")}</h3>
          <form onSubmit={finishAction}>
            <input
              type={"password"}
              placeholder={t("createPassword")!}
              value={password}
              onChange={passwordHanlder}
            ></input>
          </form>
        </div>
      );
    }
  }, [isViewing, isPasswordless, password, isExist, message, t]);

  return (
    <MainContainer>{!isLoading ? messageContent : t("loading")}</MainContainer>
  );
}

export default MessagePage;
