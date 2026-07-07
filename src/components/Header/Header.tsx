import React, { useState, useEffect, useRef } from "react";
import { Activity, Menu } from "lucide-react";
import { Sidebar } from "../SideBar/Sidebar";
import { LoginForm } from "../Login/LoginForn";
import { setMenuOpen } from "../../redux/slice/authSlice";
import { FaClipboardUser } from "react-icons/fa6";
import "./header.scss";
import { BellRing } from "lucide-react";
import { NotificationBell } from "./Notification/Notification";
import toast from "react-hot-toast";
import { ProfileLogoutIcon } from "./Icon/ProfileLogoutIcon ";
import logotip from "../../../docs/logotip.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export function Header() {
  const [showNotification, setShowNotification] = useState(false);
  const [showLogoutIcon, setShowLogoutIcon] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const menuOpen = useAppSelector((state) => state.auth.menuOpen);
  const logo = new URL("../../../docs/logo.png", import.meta.url).href;
  const dispatch = useAppDispatch();
  const hasShownGreeting = useRef(false);
  const handleShowIcon = () => {
    setShowLogoutIcon(!showLogoutIcon); // переключаем показ иконки
  };
  const handleCloseLogoutIcon = () => {
    setShowLogoutIcon(false);
  };
  const handleBellClick = () => {
    setShowNotification(!showNotification); // переключаем открытие/закрытие
  };
  const toggleMenu = () => {
    dispatch(setMenuOpen(!menuOpen));
  };
  const closeMenu = () => {
    dispatch(setMenuOpen(false));
  };
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (user && !hasShownGreeting.current) {
      const timer = setTimeout(() => {
        toast.custom(
          (t) => (
            <div
              className={`bg-white rounded-xl border-l-8 border-red-500 shadow-lg p-5 max-w-md transition-all duration-300 ${
                t.visible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⚠️</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-base mb-2">
                    Приветствую, {user.firstName}!
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed mb-2">
                    Напоминаем, что в связи с новым законом (на основании
                    поправок в закон № 149-ФЗ) действует запрет на регистрацию и
                    вход с использованием зарубежных сервисов.
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">
                    Просьба сменить электронную почту на российский домен
                    (@mail.ru, @yandex.ru, @bk.ru и т.д.).
                  </p>
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={() => toast.dismiss(t.id)}
                      className="px-4 py-1.5 bg-[#2197ed] text-white text-sm rounded-lg hover:bg-[#1a7acc] transition-colors"
                    >
                      Понятно
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ),
          {
            duration: 15000, // 15 секунд
            id: "law-notification",
          },
        );
        hasShownGreeting.current = true;
      }, 1500); // 15 секунд задержка

      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [user]);
  return (
    <>
      <div className={`sidebar-wrapper ${menuOpen ? "open" : ""}`}>
        <Sidebar isMobileMenuOpen={menuOpen} setIsMobileMenuOpen={closeMenu} />
      </div>

      {/* Затемнение фона */}
      {menuOpen && (
        <div
          className="fixed inset-0  bg-opacity-50 z-30 lg:hidden"
          onClick={closeMenu}
        />
      )}

      <header className="header__content">
        <div className="header__layuot">
          <div className="header__left">
            {!isMobileMenuOpen && (
              <button
                // onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                onClick={toggleMenu}
                className="button__menu"
              >
                <Menu className="w-8 h-8" />
              </button>
            )}
          </div>
          {/* <button className='btn'>Записаться к врачу</button> */}
          <div className="header__center">
            {user ? (
              <img
                src={logotip}
                alt=""
                className="h-[72px] max-w-[1024px]:h-[60px]"
              />
            ) : (
              ""
            )}
            <div>
              <div className="first">
                ФЕДЕРАЛЬНОЕ ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ
              </div>
              <div className="second">ДЕТСКИЙ МЕДИЦИНСКИЙ ЦЕНТР</div>
              <div className="third">
                УПРАВЛЕНИЯ ДЕЛАМИ ПРЕЗИДЕНТА РОССИЙСКОЙ ФЕДЕРАЦИИ
              </div>
            </div>
          </div>

          {/* Правая колонка (кнопка записи и логин) */}
          <div className="header__right">
            {user ? (
              <>
                <BellRing
                  onClick={handleBellClick}
                  className="max-w-[1024px]:h-[31px] max-w-[1024px]:w-[31px]"
                />
                <h3
                  className="text-[18px] font-normal cursor-pointer max-[1025px]:text-[15px]"
                  onClick={handleShowIcon}
                >
                  Здравствуйте, <strong>{user?.firstName}</strong>
                </h3>
                <FaClipboardUser
                  className="w-10 h-10 text-[#2197ed] cursor-pointer"
                  onClick={handleShowIcon}
                />
                {showLogoutIcon && (
                  <ProfileLogoutIcon onClose={handleCloseLogoutIcon} />
                )}
              </>
            ) : (
              <img src={logotip} alt="" className="auth_logo" />
            )}
          </div>

          {!user && <LoginForm />}
        </div>
      </header>
      {showNotification && (
        <NotificationBell onClose={() => setShowNotification(false)} />
      )}
    </>
  );
}
