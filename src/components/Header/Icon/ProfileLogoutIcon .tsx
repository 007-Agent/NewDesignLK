import { User, LogOut } from "lucide-react";

import { useAppDispatch } from "../../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/slice/authSlice";
import { RussianRuble } from "lucide-react";
import { setMenuOpen } from "../../../redux/slice/authSlice";

interface ProfileLogoutProps {
  onClose: () => void;
}

export const ProfileLogoutIcon = ({ onClose }: ProfileLogoutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleExitUser = () => {
    dispatch(logoutUser());
    dispatch(setMenuOpen(false));
    navigate("/doctors");
    onClose();
  };
  const handleGoToProfile = () => {
    // ← останавливаем всплытие!
    console.log("Клик по профилю, переход на /profile");
    navigate("/profile");
    dispatch(setMenuOpen(false));
    onClose();
  };
  return (
    <div className="absolute flex flex-col items-center p-0 bg-white rounded-lg shadow-lg top-full right-10 mt-2 z-50 min-w-[160px] ">
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-3 w-full cursor-pointer transition-colors duration-200 hover:bg-gray-100 border-b border-gray-200 bg-transparent"
        onClick={handleGoToProfile}
      >
        <User size={27} strokeWidth={1.5} />
        <span className="text-sm text-gray-700">профиль</span>
      </button>
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-3 w-full cursor-pointer transition-colors duration-200 hover:bg-gray-100 bg-transparent"
        onClick={handleExitUser}
      >
        <LogOut size={27} strokeWidth={1.5} />
        <span className="text-sm text-gray-700">Выход</span>
      </button>
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-3 w-full cursor-pointer transition-colors duration-200 hover:bg-gray-100 bg-transparent"
        onClick={handleExitUser}
      >
        <RussianRuble size={27} strokeWidth={1.5} />
        <span className="text-sm text-gray-700">Оплата услуг</span>
      </button>
    </div>
  );
};
