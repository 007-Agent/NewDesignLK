import React, {useState} from 'react';
import { Activity, Menu } from 'lucide-react';
import { Sidebar } from '../SideBar/Sidebar';
import { LoginForm } from '../Login/LoginForn';
import './header.scss'
import { useAppSelector } from '../../redux/hooks';
export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const user = useAppSelector((state) => state.auth.user);
  return (
    <>
       

      {/* Контейнер сайдбара с анимацией */}
      <div className={`
        fixed top-0 left-0 h-full z-40
        transform transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:relative lg:z-0
      `}>
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
          <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="button__menu"
      >
        <Menu className="w-8 h-8" />
      </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl">Medicare Clinic</h1>
        </div>
        <div className="flex items-center gap-4 p-r-50">
        <button className="header-btn-appointment">
          Записаться к врачу!
        </button>
        </div>

          {!user && <LoginForm />}
        </div>
        
      </header>
    </>
    
  );
}