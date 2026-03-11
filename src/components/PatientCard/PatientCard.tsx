import { User, Calendar, FileText } from 'lucide-react';
import { PatientFull } from '../patientDetailsFull/PatientFull/PatientFull';
import { useNavigate } from 'react-router-dom';
import './patientcard.scss'
import { Usernow } from '../../redux/authSlice';
interface PatientFullData {
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
interface PatientCardProps {
  patient: PatientFullData;
  user: Usernow; // если нужен – убедись, что User импортирован или объявлен
}

export function PatientCard({ patient, user }: PatientCardProps) {
  const usernow = user;
  const navigate = useNavigate();
  //   const handleCardClick = () => {
  //   // Переход на страницу детальной информации
  //   navigate(`/patientsfullinfo/${fullName}/${patient}`);
  // };
  const handleCardClick = () => {
   
    navigate(`/patientsfullinfo/${patient.fio}`, {
      state: { patient } // Весь объект пациента
    });
  };

  return (
    <div  className="patient-card"  onClick={handleCardClick} >
      {/* Patient Avatar and Name */}
      <div className="patient-card-header">
        <div className={`patient-avatar ${patient.gender === 'муж' ? 'male' : 'female'}`}>
          <User className={patient.gender === 'муж' ? 'male' : 'female'} />
        </div>
        <div>
          <h3 className="patient-name">{patient.fio}</h3>
          <p className="patient-gender">{patient.gender}</p>
        </div>
      </div>

      {/* Patient Details */}
      <div className="patient-details">
        <div className="patient-detail-item">
          <Calendar />
          <div>
            <p className="patient-detail-label">Дата рождения</p>
            <p className="patient-detail-value">{patient.birthday}</p>
          </div>
        </div>

        <div className="patient-detail-item">
          <FileText />
          <div>
            <p className="patient-detail-label">Номер мед. карты</p>
            <p className="patient-detail-value">{patient.nib}</p>
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