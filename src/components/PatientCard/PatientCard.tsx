import { User, Calendar, FileText } from 'lucide-react';
import { PatientDetailPage } from '../patientDetailsFull/PatientDetail/PatientDetailPage';
import { useNavigate } from 'react-router-dom';
import './patientcard.scss'

interface Patient {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  medicalCardNumber: string;
}
interface PatientCardProps {
  patient: Patient,
  fullName: string;
  gender: string;
  dateOfBirth: string;
  medicalCardNumber: string;
  
}

export function PatientCard({ patient, fullName, gender, dateOfBirth, medicalCardNumber }: PatientCardProps) {
  const navigate = useNavigate();
  //   const handleCardClick = () => {
  //   // Переход на страницу детальной информации
  //   navigate(`/patientsfullinfo/${fullName}/${patient}`);
  // };
  const handleCardClick = () => {
   
    navigate(`/patientsfullinfo/${fullName}`, {
      state: { patient } // Весь объект пациента
    });
  };

  return (
    <div  className="patient-card"  onClick={handleCardClick} >
      {/* Patient Avatar and Name */}
      <div className="patient-card-header">
        <div className={`patient-avatar ${gender === 'Мужской' ? 'male' : 'female'}`}>
          <User className={gender === 'Мужской' ? 'male' : 'female'} />
        </div>
        <div>
          <h3 className="patient-name">{fullName}</h3>
          <p className="patient-gender">{gender}</p>
        </div>
      </div>

      {/* Patient Details */}
      <div className="patient-details">
        <div className="patient-detail-item">
          <Calendar />
          <div>
            <p className="patient-detail-label">Дата рождения</p>
            <p className="patient-detail-value">{dateOfBirth}</p>
          </div>
        </div>

        <div className="patient-detail-item">
          <FileText />
          <div>
            <p className="patient-detail-label">Номер мед. карты</p>
            <p className="patient-detail-value">{medicalCardNumber}</p>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          
        }}
        className="patient-card-action"
      >
        Подробнее
      </button>
    </div>
  );
}