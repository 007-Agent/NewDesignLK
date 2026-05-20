import React, {useState} from 'react';
import { Activity, Menu } from 'lucide-react';
import { Sidebar } from '../SideBar/Sidebar';
import { LoginForm } from '../Login/LoginForn';
import { setMenuOpen } from '../../redux/authSlice';
import { FaClipboardUser } from "react-icons/fa6";
import './header.scss'

import { ProfileLogoutIcon } from './Icon/ProfileLogoutIcon ';
import logotip from "../../../docs/logotip-2.png"

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
export function Header() {
    const [showLogoutIcon, setShowLogoutIcon] = useState(false); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const menuOpen  = useAppSelector((state) => state.auth.menuOpen);
    const logo = new URL('../../../docs/logo.png', import.meta.url).href;
      const dispatch = useAppDispatch();

  const handleShowIcon = () => {
        setShowLogoutIcon(!showLogoutIcon); // переключаем показ иконки
    };
     const toggleMenu = () => {
    dispatch(setMenuOpen(!menuOpen));
  };
  const closeMenu = () => {
    dispatch(setMenuOpen(false));
  };

  return (
    <>
       


<div className={`sidebar-wrapper ${menuOpen ? 'open' : ''}`}>
  <Sidebar
      isMobileMenuOpen={menuOpen}
          setIsMobileMenuOpen={closeMenu}
  />
</div>

      {/* Затемнение фона */}
      {menuOpen  && (
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
        <div className="header__center">
    <div >
          <div className='first'>
            ФЕДЕРАЛЬНОЕ ГОСУДАРСТВЕННОЕ БЮДЖЕТНОЕ УЧРЕЖДЕНИЕ
          </div>
          <div className='second'>ДЕТСКИЙ МЕДИЦИНСКИЙ ЦЕНТР</div>
          <div className='third'>
            УПРАВЛЕНИЯ ДЕЛАМИ ПРЕЗИДЕНТА РОССИЙСКОЙ ФЕДЕРАЦИИ
          </div>
        </div>
  </div>

  {/* Правая колонка (кнопка записи и логин) */}
  <div className="header__right" onClick={handleShowIcon}>
 {user ? (
  <>
    <h3 className="text-[18px] font-normal cursor-pointer">
      Здравствуйте, <strong>{user?.firstName}</strong>
    </h3>
    <FaClipboardUser className="w-10 h-10 text-[#2197ed] cursor-pointer"/>
    {showLogoutIcon && <ProfileLogoutIcon />}
  </>
) : (
  <img src={logotip} alt="" className='auth_logo'/>
)}
    
    
    
  </div>
  {!user && <LoginForm />}
</div>
        
      </header>
    </>
    
  );
}