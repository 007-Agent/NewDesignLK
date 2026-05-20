import { User, LogOut } from 'lucide-react';
import './profile.scss';
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
    <div className="profile-logout-icon">
      <div className="profile-logout-icon__item">
        <User size={27} strokeWidth={1.5} />
        <span>профиль</span>
      </div>
      <div className="profile-logout-icon__item" onClick={handleExitUser}>
        <LogOut size={27} strokeWidth={1.5} />
        <span>Выход</span>
      </div>
    </div>
  );
};