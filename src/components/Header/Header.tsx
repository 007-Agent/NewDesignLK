import React, {useState} from 'react';
import { Activity, Menu } from 'lucide-react';
import { Sidebar } from '../SideBar/Sidebar';
import { LoginForm } from '../Login/LoginForn';
// import logo from '../../../docs/logo'
import { FaClipboardUser } from "react-icons/fa6";
import './header.scss'
// import { Usernow } from '../../redux/authSlice';
import { ProfileLogoutIcon } from './Icon/ProfileLogoutIcon ';


import { useAppSelector } from '../../redux/hooks';
export function Header() {
    const [showLogoutIcon, setShowLogoutIcon] = useState(false); 
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const logo = new URL('../../../docs/logo.png', import.meta.url).href;

  const handleShowIcon = () => {
        setShowLogoutIcon(!showLogoutIcon); // переключаем показ иконки
    };

  return (
    <>
       


<div className={`sidebar-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
  <Sidebar
  isMobileMenuOpen={isMobileMenuOpen}
    setIsMobileMenuOpen={setIsMobileMenuOpen}
  />
</div>

      {/* Затемнение фона */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0  bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <header className="header__content">
        <div className="header__layuot">


<div className="header__left">
    {!isMobileMenuOpen && (
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
    <FaClipboardUser className="w-10 h-10 text-teal-500 cursor-pointer"/>
    {showLogoutIcon && <ProfileLogoutIcon />}
  </>
) : (
  <img src={logo} alt="logo" style={{width: '70px', height: '70px'}} />
)}
    
    
    
  </div>
  {!user && <LoginForm />}
</div>
        
      </header>
    </>
    
  );
}