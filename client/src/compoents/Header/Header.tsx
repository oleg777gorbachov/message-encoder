import { ChangeEvent, FormEventHandler, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuLinksI } from "../../types/MenuLinksI";
import languageIcon from "../../assets/language.png";
import { useTranslation } from "react-i18next";
import { LanguageI } from "../../types/LanguageI";

const languages: LanguageI[] = [
  { language: "en", text: "ENG" },
  {
    language: "ru",
    text: "RUS",
  },
  {
    language: "ua",
    text: "UA",
  },
];

function Header() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [search, setSearch] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const menuLink: MenuLinksI[] = [
    {
      element: t("home"),
      path: "/",
    },
  ];

  const menuItems = useMemo(
    () =>
      menuLink.map((e) => (
        <li key={e.path}>
          <Link to={e.path}>{e.element}</Link>
        </li>
      )),
    [t]
  );

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submut: FormEventHandler<HTMLFormElement> = (e) => {
    if (search.length <= 0) {
      e.preventDefault();
      return;
    }

    navigate("/message/" + search);
  };

  return (
    <nav className="fade-down">
      <ul>
        {menuItems}
        <li>
          <form onSubmit={submut}>
            <input
              type={"text"}
              placeholder={t("search")!}
              value={search}
              onChange={searchHandler}
            />
          </form>
        </li>
        <li className="hover">
          <img src={languageIcon} alt="language" />
          <span>
            {languages.filter((e) => e.language === selectedLanguage)[0].text}
          </span>
          <div className="hover-container">
            {languages
              .filter((e) => e.language !== selectedLanguage)
              .map((e) => (
                <div
                  key={e.language}
                  onClick={() => {
                    i18n.changeLanguage(e.language);
                    setSelectedLanguage(e.language);
                    localStorage.setItem("language", e.language);
                  }}
                  className="hover-link"
                >
                  {e.text}
                </div>
              ))}
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
