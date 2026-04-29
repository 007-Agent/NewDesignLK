import { useState } from 'react';
import { User, ArrowLeft, FileText, Syringe, Activity, Eye, HeartPulse, Calendar } from 'lucide-react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Medicaments from './Medicaments/Medicaments';
import "./Patientfull.scss"
import { Visits } from './Visits/Visits';
import { Usernow } from '../../../redux/authSlice';
import Contracts from './Contracts/Contracts';
import Vaccinations from './Vacination/Vacinations';
import {AppointmentModal} from '../../AppointmentModal/AppointmentModal';
import Analyzes from './Analyzes/Analyzes';
import Observations from './Observations/Observations';
import Disables from './Disables/Disables';
import { formatDate } from '../../../utils/utils';

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
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const navigate = useNavigate();




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
  
  const examinations = [
    { year: '2023', date: '15.05.2023', status: 'Пройдена', result: 'Здоров' },
    { year: '2024', date: '-', status: 'Запланирована', result: '-' },
  ];

  
 const onBack = () => {
   navigate('/patients');
 }
  return (
    <div className='patient__font'>
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
          <button className="header-btn-appointment" onClick={() => setIsAppointmentModalOpen(true)}>
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
           <Disables patient={patient} user={user}/>
          </div>
        )}

        {/* Вакцинация */}
        {activeTab === 'vaccination' && (
          <div className='vaccina__box'>
            <Vaccinations patient={patient} user={user}/>
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
          
            < Analyzes patient={patient} user={user}/>
          </div>
        )}

        {/* Активное наблюдение */}
        {activeTab === 'monitoring' && (
          <div>
            <Observations patient={patient} user={user}/>
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
      <AppointmentModal 
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        patient = {patient}
      />
    </div>
  );
}
