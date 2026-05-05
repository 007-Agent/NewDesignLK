import React, { useState, useEffect } from 'react'
import  './edit.scss'
import axios, { AxiosError } from 'axios';
import { X } from 'lucide-react';
import { formatDate } from '../../../../../../utils/utils'

interface Patient {
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
export interface Visited {
  active: number;               // активность (0/1)
  branchId: number;
  branchName: string;
  busy: number;                  // занят ли?
  date: string;                  // дата в формате YYYY-MM-DD
  departmentId: number;
  departmentName: string;
  doctorId: number;
  doctorName: string;
  from: string;                   // время начала "HH:MM:SS"
  id: number;
  patientId: number;
  patientName: string;
  resourceId: number;
  room: string;
  specialityId: number;
  specialityName: string;
  status: number;                 // статус записи
  to: string;                     // время окончания
  visitDocId: string;             // ID документа визита (пустая строка, если нет)
}
interface EditProps {
  patient: Patient;
  show: boolean;
  visit: Visited;
  onClose?: () => void;
  onRefresh: () => void; 
}




const Edit = (props : EditProps) => {
  const visit = props.visit || {}
  const patient = props.patient || {}
  const show = props.show
  console.log(visit, patient, "Props content")
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("")



//   const renderVisit = () => {
//     return (
//       <React.Fragment>
//         <div >
//           <div >{formatDate(visit.date)}</div>
//           <div >{cutTime(visit.from)}</div>
//         </div>
//         <div >{visit.specialityName}</div>
//         <div >{visit.doctorName}</div>
//       </React.Fragment>
//     )
//   }
const cancelVisit = async () => {
  try {
    await axios.post('/api/visit/clear', {
      visitId: visit.id,
      patientId: patient.id
    });
    setMessage('Запись отменена');
    if (props.onClose) {
    props.onClose();
    if(props.onRefresh){
        props.onRefresh()
    }
  }
  } catch (error) {
    console.error(error);
    let errorMessage = 'Ошибка отмены';
    if (error instanceof AxiosError) {
      errorMessage = error.response?.data?.error?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    setError(errorMessage);
  }
};

  const onClose = () => {
  if (props.onClose) {
    props.onClose();
  }
};

  useEffect(() => {
    if (show) {
      setMessage("")
      setError(null)
    }
  }, [show])


return (
     <div className="cancel-modal-overlay" >
      <div className="cancel-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="cancel-modal-close" >
          <X onClick={onClose}/>
        </button>

        <h2 className="cancel-modal-title">Отменить запись?</h2>

        <div className="cancel-modal-patient">
          <div className="cancel-modal-patient-name">{patient.fio}</div>
          <div className="cancel-modal-patient-card">
            Медицинская карта: {patient.nib}
          </div>
        </div>

        <div className="cancel-modal-appointment">
          <div className="cancel-modal-info-row">
            <span className="cancel-modal-label">Дата и время:</span>
            <span className="cancel-modal-value">
              {formatDate(visit.date)} в {visit.from}
            </span>
          </div>
          <div className="cancel-modal-info-row">
            <span className="cancel-modal-label">Специальность:</span>
            <span className="cancel-modal-value">{visit.specialityName}</span>
          </div>
          <div className="cancel-modal-info-row">
            <span className="cancel-modal-label">Врач:</span>
            <span className="cancel-modal-value">{visit.doctorName}</span>
          </div>
        </div>

        <div className="cancel-modal-actions">
          <button className="cancel-modal-btn-back" onClick={onClose}>
            Назад
          </button>

          <button className="cancel-modal-btn-confirm" onClick={cancelVisit}>
            Отменить запись
          </button>
        </div>
      </div>
    </div>
  )
}



export default Edit
