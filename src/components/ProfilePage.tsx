import { User, Mail, Phone, Calendar, Users } from 'lucide-react';
import { Usernow } from '../redux/authSlice';
interface ProfilePageProps {
  user: Usernow | null;
}
export function ProfilePage({ user }: ProfilePageProps) {
  const userData = {
    fullName: 'Иванов Иван Иванович',
    email: 'ivanov@example.com',
    phone: '+7 (495) 123-45-67',
    dateOfBirth: '15.03.1985',
    gender: 'Мужской',
    children: [
      { name: 'Иванова Мария Ивановна', age: 12 },
      { name: 'Иванов Петр Иванович', age: 8 },
    ],
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
            <h3 className="mb-1">{userData.fullName}</h3>
            <p className="text-gray-500">Пациент</p>
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
                <p className="text-gray-900">{userData.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Телефон</p>
                <p className="text-gray-900">{userData.phone}</p>
              </div>
            </div>

            {/* Date of Birth */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Дата рождения</p>
                <p className="text-gray-900">{userData.dateOfBirth}</p>
              </div>
            </div>

            {/* Gender */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Пол</p>
                <p className="text-gray-900">{userData.gender}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Children */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-orange-600" />
            </div>
            <h3>Дети</h3>
          </div>

          <div className="space-y-4">
            {userData.children.map((child, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">{child.name}</p>
                    <p className="text-sm text-gray-500">{child.age} лет</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
