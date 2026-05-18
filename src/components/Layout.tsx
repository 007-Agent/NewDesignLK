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
  return (
    <>


<div className="min-h-[83vh] bg-gray-50 relative overflow-auto">
      

     
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Основной контент */}
      <main className="min-h-[83vh] overflow-auto">
      <div className={`
        mx-auto px-6 lg:px-12 py-8
        ${isHomePage 
          ? 'max-w-[calc(7/6*100%)]'  // увеличиваем на ~30% (примерно как 130%)
          : 'max-w-7xl'
        }
      `}>
        <Outlet />
      </div>
    </main>
    </div>
    </>
    
  );
}