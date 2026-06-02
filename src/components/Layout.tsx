import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './SideBar/Sidebar';
import { useState } from 'react';
import { Header } from './Header/Header';
import { LoginForm } from './Login/LoginForn';
export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
  
  // Определяем, находимся ли мы на странице HomePage
  const isHomePage = location.pathname === '/home';
  const isPatientCards = location.pathname === '/patients'
  return (
    <>


      

     
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Основной контент */}
        {/* <div className={`h-[85vh]  ${isPatientCards || isHomePage ? 'overflow-y-hidden' : 'overflow-y-auto' } bg-[#f7f7f7] [scrollbar-gutter:stable] ` }> */}
         <div className="flex-1 overflow-y-auto min-h-0 bg-[#f7f7f7] [scrollbar-gutter:stable] max-[450px]:pb-8">
      <div className={`
        mx-auto  
        ${isHomePage 
          ? 'max-w-[calc(7/6*100%)]'  // увеличиваем на ~30% (примерно как 130%)
          : 'max-w-7xl'
        }
      `}>
        <Outlet />
      </div>
    </div>
    
    </>
    
  );
}