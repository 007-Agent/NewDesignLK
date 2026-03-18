import React, {useState} from 'react';
import { Activity, Menu } from 'lucide-react';
import { Sidebar } from '../SideBar/Sidebar';
import { LoginForm } from '../Login/LoginForn';
// import logo from '../../../docs/logo'
import './header.scss'

import { useAppSelector } from '../../redux/hooks';
export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
    const logo = new URL('../../../docs/logo.png', import.meta.url).href;
  return (
    <>
       

      {/* Контейнер сайдбара с анимацией */}
      {/* <div className={`
  fixed top-0 left-0 h-full z-40
  transform transition-all duration-[100] ease-in-out
  ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
  lg:translate-x-0 lg:relative lg:z-0
`}>
  <Sidebar
    isMobileMenuOpen={isMobileMenuOpen}
    setIsMobileMenuOpen={setIsMobileMenuOpen}
  />
</div> */}
<div className={`sidebar-wrapper ${isMobileMenuOpen ? 'open' : ''}`}>
  <Sidebar
  isMobileMenuOpen={isMobileMenuOpen}
    setIsMobileMenuOpen={setIsMobileMenuOpen}
  />
</div>

      {/* Затемнение фона */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
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
  <div className="header__right">
    {/* <button className="header-btn-appointment">Записаться к врачу!</button> */}
    <img src={logo} alt="" style={{width: '70px', height: '70px'}}/>
    {!user && <LoginForm />}
  </div>
</div>
        
      </header>
    </>
    
  );
}