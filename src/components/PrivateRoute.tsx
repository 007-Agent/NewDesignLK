import { Navigate } from 'react-router-dom';

interface Profile {
  id: number;
uuid: string;
firstName: string;
lastName: string;
middleName: string;
birthday: string;
email: string;
phone: string;
username: string | null;
name: string | null;
polId: number;
stateId: number;
authorities: string[];
captcha: any;
agreed: number;
}
interface ProfilePageProps {
  user: Profile | null;
  children: any;
}

export const PrivateRoute = ({ children, user} : ProfilePageProps) => {
  return user ? children : <Navigate to="/doctors" replace />;
};