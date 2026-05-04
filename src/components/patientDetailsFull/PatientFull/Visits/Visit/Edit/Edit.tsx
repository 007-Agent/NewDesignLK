import React, { useState, useEffect } from 'react'
import  './edit.scss'
import axios from 'axios'
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
  
  visit: Visited;

}




const Edit = (props : EditProps) => {
  const visit = props.visit || {}
  const patient = props.patient || {}
  const show = props.show

  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)



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
    await axios.post('/api/visit/clear', { visitId: visit.id, patientId: patient.id });
    setMessage('Запись отменена');
  } catch (error) {
    const errorMessage = error.response?.data?.error?.message || error.message || 'Ошибка отмены';
    setError(errorMessage);
  }
};

  const onClose = event => {
    if ('ok' === event.button) {
      if (props.onClose) props.onClose({ refresh: true })
    } else if ('continue' === event.button) {
      if (props.onClose) props.onClose()
    } else if ('save' === event.button) {
      cancelVisit()
    } else if ('cancel' === event.button) {
      if (props.onClose) props.onClose()
    }
  }

  useEffect(() => {
    if (show) {
      setMessage(null)
      setError(null)
    }
  }, [show])

//   const content = visit ? (
//     <div style={style.content}>
//       <div style={style.caption}>{'Отменить запись?'}</div>
//       <TGroup style={style.group} label={'Пациент'}>
//         <div style={style.row}>
//           <div style={style.date}>{patient.nib}</div>
//           <div style={style.time}>{patient.fio}</div>
//         </div>
//       </TGroup>
//       <TGroup style={style.group} label={'Запись'}>
//         {renderVisit()}
//       </TGroup>
//     </div>
//   ) : null

  return (
     <div className="cancel-modal-overlay" onClick={onClose}>
      <div className="cancel-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="cancel-modal-close" onClick={onClose}>
          <X />
        </button>

        <h2 className="cancel-modal-title">Отменить запись?</h2>

        <div className="cancel-modal-patient">
          <div className="cancel-modal-patient-name">{patientName}</div>
          <div className="cancel-modal-patient-card">
            Медицинская карта: {medicalCardNumber}
          </div>
        </div>

        <div className="cancel-modal-appointment">
          <div className="cancel-modal-info-row">
            <span className="cancel-modal-label">Дата и время:</span>
            <span className="cancel-modal-value">
              {appointmentDate} в {appointmentTime}
            </span>
          </div>
          <div className="cancel-modal-info-row">
            <span className="cancel-modal-label">Специальность:</span>
            <span className="cancel-modal-value">{specialty}</span>
          </div>
          <div className="cancel-modal-info-row">
            <span className="cancel-modal-label">Врач:</span>
            <span className="cancel-modal-value">{doctorName}</span>
          </div>
        </div>

        <div className="cancel-modal-actions">
          <button className="cancel-modal-btn-back" onClick={onClose}>
            Назад
          </button>
          
          <button className="cancel-modal-btn-confirm" onClick={handleCancel}>
            Отменить запись
          </button>
        </div>
      </div>
    </div>
  )
}



export default Edit
