import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavbarBrand,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../redux/features/authSlice";
import { searchColls } from "../redux/features/collSlice";
import { useNavigate } from "react-router-dom";
import i18 from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";

const translationsEn = {
  Collections: "Collections",
  Home: "Home",
  Add: "Add Collection",
  Dashboard: "Dashboard",
  Login: "Login",
  Logout: "Logout",
  Search: "Search",

};
const translationsRU = {
  Collections: "Коллекции",
  Home: "Главная",
  Add: "Добавить",
  Dashboard: "Мои Коллекции",
  Login: "Войти",
  Logout: "Выйти",
  Search: "Поиск",
};

i18.use(initReactI18next).init({
  resources: {
    EN: { translation: translationsEn },
    RU: { translation: translationsRU },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const Header = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchColls(search));
      navigate(`/colls/search?searchQuery=${search}`);
      setSearch("");
    } else {
      navigate("/");
    }
  };

  const handleLocalization = (event) => {
    i18.changeLanguage(event.target.value);
  };

  const { user } = useSelector((state) => ({ ...state.auth }));

  return (
    <MDBNavbar fixed="top" expand="lg" style={{ backgroundColor: "#355c7d" }}>
      <select className="lang" onChange={handleLocalization}>
        <option value="EN">EN</option>
        <option value="RU">RU</option>
      </select>
      <MDBContainer>
        <MDBNavbarBrand
          href="/"
          style={{ color: "#fff", fontWeight: "600", fontSize: "22px" }}
        >
          {t("Collections")}
        </MDBNavbarBrand>
        <form className="d-flex input-group w-auto" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder={t("Search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MDBIcon
            fas
            icon="search"
            style={{ color: "#fff", marginTop: "10px", marginLeft: "6px" }}
          />
        </form>
        <MDBNavbarToggler
          type="button"
          aria-expanded="false"
          aria-label="Toogle navigation"
          onClick={() => setShow(!show)}
          style={{ color: "#eceecd" }}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>
        <MDBCollapse show={show} navbar>
          <MDBNavbarNav right fullWidth={false} className="mb-2 mb-lg-0">
            <MDBNavbarItem>
              <MDBNavbarLink href="/">
                <p className="header-text">{t("Home")}</p>
              </MDBNavbarLink>
            </MDBNavbarItem>

            {user?.result?._id && (
              <>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/addColl">
                    <p className="header-text">{t("Add")}</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <MDBNavbarLink href="/dashboard">
                    <p className="header-text">{t("Dashboard")}</p>
                  </MDBNavbarLink>
                </MDBNavbarItem>
              </>
            )}
            {user?.result?._id ? (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text" onClick={() => handleLogout()}>
                    {t("Logout")}
                  </p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            ) : (
              <MDBNavbarItem>
                <MDBNavbarLink href="/login">
                  <p className="header-text"> {t("Login")}</p>
                </MDBNavbarLink>
              </MDBNavbarItem>
            )}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
};

export default Header;
