import { useState } from 'react';
import { Calendar, Clock, MapPin, Building2, User } from 'lucide-react';

export function SchedulePage() {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  const branches = [
    'Филиал №1 - Центральный',
    'Филиал №2 - Северный',
    'Филиал №3 - Южный',
  ];

  const departments = [
    'Педиатрия',
    'Кардиология',
    'Неврология',
    'Офтальмология',
  ];

  const doctors = [
    { name: 'Смирнов Игорь Петрович', specialty: 'Педиатр' },
    { name: 'Кузнецова Анна Владимировна', specialty: 'Педиатр' },
    { name: 'Петрова Елена Сергеевна', specialty: 'Кардиолог' },
  ];

  const schedule = [
    { day: 'Понедельник', time: '09:00 - 14:00', status: 'Приём' },
    { day: 'Вторник', time: '09:00 - 14:00', status: 'Приём' },
    { day: 'Среда', time: '14:00 - 19:00', status: 'Приём' },
    { day: 'Четверг', time: '09:00 - 14:00', status: 'Приём' },
    { day: 'Пятница', time: '09:00 - 14:00', status: 'Приём' },
    { day: 'Суббота', time: '10:00 - 15:00', status: 'Приём' },
    { day: 'Воскресенье', time: '-', status: 'Выходной' },
  ];

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h2 className="mb-1">Расписание врачей</h2>
          <p className="text-gray-600 text-sm">Выберите врача для просмотра расписания</p>
        </div>
      </div>

      {/* Selection Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Branch Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm mb-2 text-gray-700">
              <MapPin className="w-4 h-4 text-gray-400" />
              Филиал
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
            >
              <option value="">Выберите филиал</option>
              {branches.map((branch, index) => (
                <option key={index} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
          </div>

          {/* Department Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm mb-2 text-gray-700">
              <Building2 className="w-4 h-4 text-gray-400" />
              Отделение
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              disabled={!selectedBranch}
            >
              <option value="">Выберите отделение</option>
              {departments.map((department, index) => (
                <option key={index} value={department}>
                  {department}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Selection */}
          <div>
            <label className="flex items-center gap-2 text-sm mb-2 text-gray-700">
              <User className="w-4 h-4 text-gray-400" />
              Врач
            </label>
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
              disabled={!selectedDepartment}
            >
              <option value="">Выберите врача</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor.name}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Schedule Display */}
      {selectedDoctor && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Doctor Info Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl mb-1">{selectedDoctor}</h3>
                <p className="text-teal-100">
                  {doctors.find((d) => d.name === selectedDoctor)?.specialty}
                </p>
              </div>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="p-6">
            <h3 className="mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              Расписание на неделю
            </h3>
            <div className="space-y-3">
              {schedule.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    item.status === 'Выходной'
                      ? 'bg-gray-50 border-gray-200'
                      : 'bg-teal-50 border-teal-200'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-32">
                      <p className="font-medium text-gray-900">{item.day}</p>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <p>{item.time}</p>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`px-4 py-1 rounded-full text-sm ${
                        item.status === 'Выходной'
                          ? 'bg-gray-200 text-gray-700'
                          : 'bg-teal-500 text-white'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!selectedDoctor && (
        <div className="bg-white rounded-xl p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-gray-500 mb-2">Выберите врача</h3>
          <p className="text-gray-400 text-sm">
            Чтобы увидеть расписание, выберите филиал, отделение и врача
          </p>
        </div>
      )}
    </div>
  );
}
