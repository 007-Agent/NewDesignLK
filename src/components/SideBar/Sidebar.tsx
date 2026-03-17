// 

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Menu, Home, User, Users, Calendar, Shield, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { logoutUser } from '../../redux/authSlice';
import { setMenuOpen } from "../../redux/authSlice";
import './sidebar.scss'
interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const navigate = useNavigate();
  const menuItems = [
    { label: 'Профиль', page: '/profile', icon: Home },
    { label: 'Записи', page: '/doctors', icon: User },
    { label: 'Пациенты', page: '/patients', icon: Users },
    { label: 'Расписание', page: '/schedule', icon: Calendar },
    { label: 'Конфиденциальность', page: '/policy', icon: Shield },
   
  ];
    const dispatch = useAppDispatch();
  const handleExitUser = () => {
    dispatch(logoutUser());
    dispatch(setMenuOpen(false));
    navigate('/doctors');
 window.location.reload();
  };
  return (
    <>
     

     <aside className="sidebar">
  <div className="sidebar__container">
    <nav className="sidebar__nav">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={index}
            to={item.page}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => `
              nav-item ${isActive ? 'nav-item--active' : 'nav-item--inactive'}
            `}
          >
            <Icon className="nav-item__icon" />
            {item.label}
          </NavLink>
        );
      })}
    </nav>
    <button onClick={handleExitUser}>Выход</button>
    {/* Футер сайдбара */}
    <div className="sidebar__footer">
      <div className="sidebar__footer-icon-wrapper">
        <Menu className="sidebar__footer-icon" />
      </div>
    </div>
  </div>
</aside>
    </>
  );
}