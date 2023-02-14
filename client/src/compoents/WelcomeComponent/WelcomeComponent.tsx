import { useTranslation } from "react-i18next";
import { WelcomeComponentI } from "../../types/components/WelcomeComponentI";

function WelcomeComponent({ clickAction }: WelcomeComponentI) {
  const { t } = useTranslation();

  return (
    <div style={{ height: "100%", textAlign: "center" }}>
      <h2>{t("hero")}</h2>
      <button onClick={clickAction}>{t("herobtn")}</button>
    </div>
  );
}

export default WelcomeComponent;
