import { Calendar, Clock, User, MapPin, FileText } from 'lucide-react';
import './AppointmentsPage.css';

export function AppointmentsPage() {
  const appointmentsData = [
    {
      childName: 'Иванова Мария Ивановна',
      childAge: 12,
      appointments: [
        {
          id: 1,
          date: '25.02.2026',
          time: '10:00',
          doctor: 'Смирнов Игорь Петрович',
          specialty: 'Педиатр',
          service: 'Плановый осмотр',
          branch: 'Филиал №1 - Центральный',
          cabinet: 'Кабинет 205',
          status: 'Подтверждена',
        },
        {
          id: 2,
          date: '28.02.2026',
          time: '14:30',
          doctor: 'Петрова Елена Сергеевна',
          specialty: 'Кардиолог',
          service: 'Консультация кардиолога',
          branch: 'Филиал №1 - Центральный',
          cabinet: 'Кабинет 310',
          status: 'Ожидание',
        },
      ],
    },
    {
      childName: 'Иванов Петр Иванович',
      childAge: 8,
      appointments: [
        {
          id: 3,
          date: '26.02.2026',
          time: '11:30',
          doctor: 'Кузнецова Анна Владимировна',
          specialty: 'Педиатр',
          service: 'Вакцинация',
          branch: 'Филиал №2 - Северный',
          cabinet: 'Кабинет 102',
          status: 'Подтверждена',
        },
        {
          id: 4,
          date: '03.03.2026',
          time: '09:00',
          doctor: 'Волкова Светлана Михайловна',
          specialty: 'Офтальмолог',
          service: 'Проверка зрения',
          branch: 'Филиал №1 - Центральный',
          cabinet: 'Кабинет 408',
          status: 'Подтверждена',
        },
      ],
    },
  ];

  return (
    <div>
      <div className="appointments-page-header">
        <div className="appointments-header-icon">
          <Calendar />
        </div>
        <div className="appointments-header-title">
          <h2>Записи к врачу</h2>
          <p className="appointments-header-count">
            Активных записей: {appointmentsData.reduce((acc, child) => acc + child.appointments.length, 0)}
          </p>
        </div>
      </div>

      {/* Appointments by child */}
      {appointmentsData.map((child, childIndex) => (
        <div key={childIndex} className="appointments-child-section">
          {/* Child Header */}
          <div className="appointments-child-header">
            <div className="appointments-child-avatar">
              <User />
            </div>
            <div>
              <h3>{child.childName}</h3>
              <p className="appointments-child-age">{child.childAge} лет</p>
            </div>
            <span className="appointments-child-badge">
              {child.appointments.length} {child.appointments.length === 1 ? 'запись' : 'записи'}
            </span>
          </div>

          {/* Appointments List */}
          <div className="appointments-list">
            {child.appointments.map((appointment) => (
              <div key={appointment.id} className="appointment-card">
                {/* Date and Time */}
                <div className="appointment-datetime">
                  <div className="appointment-date">
                    <Calendar />
                    <span>{appointment.date}</span>
                  </div>
                  <div className="appointment-time">
                    <Clock />
                    <span>{appointment.time}</span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="appointment-info">
                  <div className="appointment-doctor">
                    <div className="appointment-doctor-avatar">
                      <User />
                    </div>
                    <div>
                      <p className="appointment-doctor-name">{appointment.doctor}</p>
                      <p className="appointment-specialty">{appointment.specialty}</p>
                    </div>
                  </div>

                  {/* Service */}
                  <div className="appointment-detail">
                    <FileText />
                    <div>
                      <p className="appointment-label">Услуга</p>
                      <p className="appointment-value">{appointment.service}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="appointment-detail">
                    <MapPin />
                    <div>
                      <p className="appointment-label">Место приёма</p>
                      <p className="appointment-value">{appointment.branch}</p>
                      <p className="appointment-value-sub">{appointment.cabinet}</p>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="appointment-footer">
                  <span className={`appointment-status ${appointment.status === 'Подтверждена' ? 'confirmed' : 'pending'}`}>
                    {appointment.status}
                  </span>
                  <div className="appointment-actions">
                    <button className="appointment-btn-cancel">Отменить</button>
                    <button className="appointment-btn-reschedule">Перенести</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
