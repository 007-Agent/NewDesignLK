// 
import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { Menu, Home, User, Users, Calendar, Shield, LogOut, Phone, Facebook, Instagram } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { logoutUser } from '../../redux/authSlice';
import { setMenuOpen } from "../../redux/authSlice";
import { FaFacebookMessenger } from "react-icons/fa6";
import { OnlineView } from '../OnlineView/OnlineView';
import { AppointmentModal } from '../AppointmentModal/AppointmentModal';
import { Patient } from '../patientDetailsFull/PatientFull/PatientFull';
import './sidebar.scss'
interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Sidebar({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) {
  const navigate = useNavigate();
  const menuItems = [
    { label: 'Главная', active: false, page: '/home', icon: Home },
    { label: 'Профиль', page: '/profile', icon: Home },
    { label: 'Записи', page: '/doctors', icon: User },
    { label: 'Пациенты', page: '/patients', icon: Users },
    { label: 'Расписание', page: '/schedule', icon: Calendar },
    { label: 'Конфиденциальность', page: '/policy', icon: Shield },
   
  ];
   const [showOnlineModal, setShowOnlineModal] = useState(false);
   const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
const [showAppointmentModal, setShowAppointmentModal] = useState(false);

    const dispatch = useAppDispatch();
const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileMenuOpen && sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
  }, [isMobileMenuOpen]);
   
const handleExitUser = () => {
    dispatch(logoutUser());
    dispatch(setMenuOpen(false));
    navigate('/doctors');
    setIsMobileMenuOpen(false)
 
  };

const handleSelectPatient = (patient: Patient) => {
  setShowOnlineModal(false);
  setIsMobileMenuOpen(false);     // закрыть сайдбар
  setSelectedPatient(patient);
  setShowAppointmentModal(true);
};
  return (
    <>
     

     <aside   className="sidebar">
  <div className="sidebar__container" ref={sidebarRef}>
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
      < X className='close_panel' onClick={() => setIsMobileMenuOpen(false)}/>
    <button onClick={handleExitUser} className='sidebar__exit'>Выход</button>
    {/* Футер сайдбара */}
    <div className="sidebar__footer">
         <div className="sidebar-footer">
            <button
               onClick={() => setShowOnlineModal(true)}
              className="sidebar-footer-btn sidebar-footer-btn-primary"
            >
              <Calendar />
              Онлайн запись
            </button>

            <a href="tel:89994389876" className="sidebar-footer-link">
              <Phone />
              <span>8 999 438 98 76</span>
            </a>

            <div className="sidebar-footer-social">
              <span className="sidebar-footer-social-text">Мы в социальных сетях</span>
              <div className="sidebar-footer-social-icons">
                <a href="#" className="sidebar-social-icon">
                <FaFacebookMessenger />
                </a>
                <a href="#" className="sidebar-social-icon">
             <FaFacebookMessenger />
                </a>
              </div>
            </div>
          </div>
    </div>
  </div>
  

</aside>
<OnlineView
  isOpen={showOnlineModal}
  onClose={() => setShowOnlineModal(false)}
   onSelectPatient={handleSelectPatient}
/>
{selectedPatient && (
  <AppointmentModal
    isOpen={showAppointmentModal}
    onClose={() => setShowAppointmentModal(false)}
    patient={selectedPatient}
  />
)}
    </>
  );
}