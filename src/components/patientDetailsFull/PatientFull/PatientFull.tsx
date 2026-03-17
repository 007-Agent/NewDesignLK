import { useState } from 'react';
import { User, ArrowLeft, FileText, Syringe, Activity, Eye, HeartPulse, Calendar } from 'lucide-react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Medicaments from './Medicaments/Medicaments';
import "./Patientfull.scss"
import { Visits } from './Visits/Visits';
import { Usernow } from '../../../redux/authSlice';
import Contracts from './Contracts/Contracts';
export interface Patient {
  address: string;
  age: string;
  birthday: string;         // дата рождения
  branchId: number;
  contacts: string;
  father: string;
  fatherPhone: string;
  fio: string;              // полное имя
  firstName: string;
  gender: string;            // "жен"
  genderId: number;          // 2
  id: number;
  lastName: string | null;
  mother: string;
  motherPhone: string;
  nib: string;               // номер медкарты
}


interface PatientDetailPageProps {
  patient: Patient;
  user: Usernow | null;
}

export function PatientFull({ patient, user }: PatientDetailPageProps) {
  const [activeTab, setActiveTab] = useState('sickLeave');
//     const { fullName } = useParams<{ fullName: string }>();
//  const location = useLocation();
  const navigate = useNavigate();
   const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};

  // Пытаемся получить пациента из state
  // const patient1 = location.state?.patient;

  const tabs = [
    { id: 'contracts', label: 'Договоры', icon: FileText },
    { id: 'sickLeave', label: 'Больничные листы', icon: FileText },
    { id: 'vaccination', label: 'Вакцинация', icon: Syringe },
    { id: 'terrapy', label: 'Антибактериальная терапия', icon: Syringe },
    { id: 'laboratory', label: 'Лабораторные исследования', icon: Activity },
    { id: 'monitoring', label: 'Активное наблюдение', icon: Eye },
    { id: 'examination', label: 'Диспансеризация', icon: HeartPulse },
    { id: 'visits', label: 'Приёмы и услуги', icon: Calendar },
  ];
  
  // Mock data
  const sickLeaves = [
    { id: '001', dateFrom: '10.01.2024', dateTo: '17.01.2024', diagnosis: 'ОРВИ', status: 'Закрыт' },
    { id: '002', dateFrom: '15.12.2023', dateTo: '22.12.2023', diagnosis: 'Грипп', status: 'Закрыт' },
  ];

  const vaccinations = [
    { name: 'Полиомиелит', date: '15.09.2023', nextDate: '15.09.2024', status: 'Выполнено' },
    { name: 'Корь, краснуха, паротит', date: '10.08.2023', nextDate: '-', status: 'Выполнено' },
  ];

  const labResults = [
    { name: 'Общий анализ крови', date: '20.12.2023', result: 'Норма', status: 'Завершено' },
    { name: 'Биохимический анализ', date: '18.12.2023', result: 'Норма', status: 'Завершено' },
  ];

  const monitoring = [
    { condition: 'Аллергия на пыльцу', doctor: 'Смирнов И.П.', period: 'Март - Июнь 2024' },
  ];

  const examinations = [
    { year: '2023', date: '15.05.2023', status: 'Пройдена', result: 'Здоров' },
    { year: '2024', date: '-', status: 'Запланирована', result: '-' },
  ];

  const appointments = [
    { date: '14.01.2024', time: '10:00', doctor: 'Смирнов И.П.', service: 'Консультация педиатра', status: 'Завершён' },
    { date: '20.01.2024', time: '14:30', doctor: 'Смирнов И.П.', service: 'Плановый осмотр', status: 'Запланирован' },
  ];
 const onBack = () => {
   navigate('/patients');
 }
  return (
    <div>
      {/* Back Button */}
      <button onClick={onBack} className="patient-detail-back">
        <ArrowLeft />
        Назад к списку пациентов
      </button>

      {/* Patient Header */}
      <div className="patient-detail-header">
        <div className="patient-detail-header-content">
          <div className={`patient-detail-avatar ${patient.gender === 'Мужской' ? 'male' : 'female'}`}>
            <User className={patient.gender === 'Мужской' ? 'male' : 'female'} />
          </div>
          <div className="patient-detail-info">
            <h2>{patient.fio}</h2>
            <div className="patient-detail-meta">
              <span>Пол: {patient.gender}</span>
              <span>Дата рождения: {formatDate(patient.birthday)}</span>
              <span>Мед. карта: {patient.nib}</span>
            </div>
          </div>
          <button className="header-btn-appointment">
          Записаться к врачу!
        </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="patient-tabs">
        <div className="patient-tabs-list">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`patient-tab ${activeTab === tab.id ? 'active' : 'inactive'}`}
              >
                <Icon />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="patient-tab-content">

       {activeTab === 'contracts' && (
          <div>
            <Contracts patient={patient} user={user}/>
          </div>
        )}

        {/* Больничные листы */}
        {activeTab === 'sickLeave' && (
          <div>
            <h3>Больничные листы</h3>
            <div className="patient-items-list">
              {sickLeaves.map((leave) => (
                <div key={leave.id} className="patient-item">
                  <div className="patient-item-header">
                    <div>
                      <p className="patient-item-title">№ {leave.id}</p>
                      <p className="patient-item-description">Диагноз: {leave.diagnosis}</p>
                    </div>
                    <span className="patient-status-badge green">
                      {leave.status}
                    </span>
                  </div>
                  <p className="patient-item-meta">
                    Период: {leave.dateFrom} - {leave.dateTo}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Вакцинация */}
        {activeTab === 'vaccination' && (
          <div>
            <h3>Вакцинация</h3>
            <div className="patient-items-list">
              {vaccinations.map((vaccine, index) => (
                <div key={index} className="patient-item">
                  <div className="patient-item-header">
                    <div>
                      <p className="patient-item-title">{vaccine.name}</p>
                      <p className="patient-item-description">Дата: {vaccine.date}</p>
                    </div>
                    <span className="patient-status-badge green">
                      {vaccine.status}
                    </span>
                  </div>
                  <p className="patient-item-meta">
                    Следующая: {vaccine.nextDate}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}


         {activeTab === 'terrapy' && (
          <div>
            <Medicaments patient={patient} user={user}/>
          </div>
        )}

        {/* Лабораторные исследования */}
        {activeTab === 'laboratory' && (
          <div>
            <h3>Лабораторные исследования</h3>
            <div className="patient-items-list">
              {labResults.map((lab, index) => (
                <div key={index} className="patient-item">
                  <div className="patient-item-header">
                    <div>
                      <p className="patient-item-title">{lab.name}</p>
                      <p className="patient-item-description">Дата: {lab.date}</p>
                    </div>
                    <span className="patient-status-badge blue">
                      {lab.status}
                    </span>
                  </div>
                  <p className="patient-item-meta">
                    Результат: {lab.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Активное наблюдение */}
        {activeTab === 'monitoring' && (
          <div>
            <h3>Активное наблюдение</h3>
            <div className="patient-items-list">
              {monitoring.map((item, index) => (
                <div key={index} className="patient-item">
                  <p className="patient-item-title">{item.condition}</p>
                  <p className="patient-item-meta">Врач: {item.doctor}</p>
                  <p className="patient-item-meta">Период: {item.period}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Диспансеризация */}
        {activeTab === 'examination' && (
          <div>
            <h3>Диспансеризация</h3>
            <div className="patient-items-list">
              {examinations.map((exam, index) => (
                <div key={index} className="patient-item">
                  <div className="patient-item-header">
                    <div>
                      <p className="patient-item-title">Диспансеризация {exam.year}</p>
                      <p className="patient-item-description">
                        {exam.date !== '-' ? `Дата: ${exam.date}` : 'Дата не назначена'}
                      </p>
                    </div>
                    <span className={`patient-status-badge ${exam.status === 'Пройдена' ? 'green' : 'yellow'}`}>
                      {exam.status}
                    </span>
                  </div>
                  <p className="patient-item-meta">
                    Результат: {exam.result}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Приёмы и услуги */}
        {activeTab === 'visits' && (
          <div>
            <Visits patient={patient} user={user}/>
          </div>
        )}
      </div>
    </div>
  );
}
