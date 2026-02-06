import { Outlet } from 'react-router-dom';
import { Sidebar } from './SideBar/Sidebar';
import { useState } from 'react';
import { Header } from './Header/Header';
import { LoginForm } from './Login/LoginForn';
export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>


    <div className="min-h-screen bg-gray-50 relative">
      
      
      

     
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Основной контент */}
      <main className="min-h-screen lg:ml-64">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
          {/* Outlet - здесь будут отображаться все страницы */}
          <Outlet />
        
        </div>
      </main>
    </div>
    </>
    
  );
}