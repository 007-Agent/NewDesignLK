import { User, LogOut } from 'lucide-react';

import { useAppDispatch } from '../../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../redux/authSlice';
import { setMenuOpen } from "../../../redux/authSlice";
export const ProfileLogoutIcon = () => {
   const navigate = useNavigate();
const dispatch = useAppDispatch();
  
  const handleExitUser = () => {
    dispatch(logoutUser());
    dispatch(setMenuOpen(false));
    navigate('/doctors');
    
 
  };
  return (
   <div className="absolute flex flex-col items-center p-0 bg-white rounded-lg shadow-lg top-full right-10 mt-2 z-50 min-w-[120px]">
      <div className="flex items-center gap-2 px-4 py-3 w-full cursor-pointer transition-colors duration-200 hover:bg-gray-100 border-b border-gray-200">
        <User size={27} strokeWidth={1.5} />
        <span className="text-sm text-gray-700">профиль</span>
      </div>
      <div 
        className="flex items-center gap-2 px-4 py-3 w-full cursor-pointer transition-colors duration-200 hover:bg-gray-100"
        onClick={handleExitUser}
      >
        <LogOut size={27} strokeWidth={1.5} />
        <span className="text-sm text-gray-700">Выход</span>
      </div>
    </div>
  );
};