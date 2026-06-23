//
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import {
  Menu,
  Home,
  User,
  Users,
  Calendar,
  Shield,
  LogOut,
  Hospital,
  Phone,
  Facebook,
  Instagram,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { logoutUser } from "../../redux/slice/authSlice";
import { setMenuOpen } from "../../redux/slice/authSlice";
import { FaFacebookMessenger } from "react-icons/fa6";
import { OnlineView } from "../OnlineView/OnlineView";
import { AppointmentModal } from "../AppointmentModal/AppointmentModal";
import { Patient } from "../patientDetailsFull/PatientFull/PatientFull";
import "./sidebar.scss";
interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

export function Sidebar({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}: SidebarProps) {
  const navigate = useNavigate();
  const menuItems = [
    { label: "Главная", active: false, page: "/home", icon: Home },
    { label: "Профиль", page: "/profile", icon: Home },
    { label: "Записи", page: "/doctors", icon: User },
    { label: "Пациенты", page: "/patients", icon: Users },
    { label: "Расписание", page: "/schedule", icon: Calendar },
    { label: "Конфиденциальность", page: "/confidence", icon: Shield },
    { label: "Отдых и лечение", page: "/sanatories", icon: Hospital },
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
    navigate("/doctors");
    setIsMobileMenuOpen(false);
  };

  const handleSelectPatient = (patient: Patient) => {
    setShowOnlineModal(false);
    setIsMobileMenuOpen(false); // закрыть сайдбар
    setSelectedPatient(patient);
    setShowAppointmentModal(true);
  };
  return (
    <>
      <aside className="h-full w-[320px] bg-[#46abf1] border-r-4 border-[#46abf1]">
        <div className="h-full overflow-auto flex flex-col px-6 py-[68px]">
          {/* Навигация */}
          <nav className="flex flex-col gap-5">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={index}
                  to={item.page}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
              nav-item ${isActive ? "nav-item--active" : "nav-item--inactive"}
            `}
                >
                  <Icon className="nav-item__icon" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <X
            className="close_panel"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Кнопка выхода */}
          <button
            onClick={handleExitUser}
            className="mt-2.5 flex items-center gap-3 text-left px-4 py-3 rounded-lg text-lg font-medium text-white hover:bg-[#f5bf03] transition-all"
          >
            Выход
          </button>

          {/* Футер */}
          <div className="mt-auto pt-6 border-t border-white/20">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowOnlineModal(true)}
                className="flex items-center justify-center gap-3 px-4 py-3 w-full border-none rounded-lg text-base font-semibold cursor-pointer transition-all bg-white text-[#edb737] hover:bg-white/90 hover:-translate-y-0.5"
              >
                <Calendar className="w-[18px] h-[18px]" />
                Онлайн запись
              </button>

              <a
                href="tel:89994389876"
                className="flex items-center justify-center gap-3 px-4 py-3 bg-white/10 rounded-lg no-underline text-white text-sm font-semibold transition-all hover:bg-white/20"
              >
                <Phone className="w-[18px] h-[18px]" />
                <span>8 999 438 98 76</span>
              </a>

              <div className="flex flex-col gap-2 pt-3">
                <span className="text-xs text-white/80 text-center">
                  Мы в социальных сетях
                </span>
                <div className="flex justify-center gap-3">
                  <a
                    href="#"
                    className="flex items-center justify-center w-9 h-9 bg-white/10 rounded-full text-white transition-all hover:bg-white/20 hover:scale-110"
                  >
                    <FaFacebookMessenger className="w-[18px] h-[18px]" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-9 h-9 bg-white/10 rounded-full text-white transition-all hover:bg-white/20 hover:scale-110"
                  >
                    <FaFacebookMessenger className="w-[18px] h-[18px]" />
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
