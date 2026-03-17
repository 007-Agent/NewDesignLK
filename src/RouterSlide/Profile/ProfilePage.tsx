import { User, Mail, Phone, Calendar, Users } from 'lucide-react';
// import { Usernow } from '../redux/authSlice';
import './profile.scss'

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
}
export function ProfilePage({ user }: ProfilePageProps) {
  console.log(user)

  const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};
 
  return (
    <div className="max-w-4xl">
      <h2 className="mb-8">Профиль пользователя</h2>

      <div className="bg-white rounded-xl shadow-sm p-8">
        {/* Profile Header */}
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
          <div className="w-24 h-24 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
          <div>
           <h3 className="Family__type">
  {user?.lastName} {user?.firstName} {user?.middleName}
</h3>
            
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-6 mb-8">
          <h3 className="mb-6">Личная информация</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-gray-900">{user?.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Телефон</p>
                <p className="text-gray-900">{user?.phone}</p>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Дата рождения</p>
                <p className="text-gray-900">{formatDate(user!.birthday)}</p>
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Пол</p>
                <p className="text-gray-900">
  {user?.polId === 1 ? 'Мужской' : 'Женский'}
</p>
              </div>
            </div>
          </div>
        </div>

        {/* Children */}
      

        {/* Edit Button */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <button className="px-8 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-sm">
            Редактировать профиль
          </button>
        </div>
      </div>
    </div>
  );
}
