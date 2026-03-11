import React, { useState } from 'react'
import './visit.scss'
// import { Usernow } from '../../../../../redux/authSlice';
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


interface VisitProps {
  patient: Patient;
  
  visit: Visited;
   onRefresh: () => void;       // функция обновления списка
  onGetMessage: (message: string) => void;
}
export function Visit ({ visit, patient, onRefresh, onGetMessage }: VisitProps) {
    const [show, setShow] = useState(false)

 const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};

// Обрезаем время до часов и минут
const formatTime = (timeStr: string) => {
  return timeStr.slice(0, 5); // "10:00" из "10:00:00"
};

  

//   const onClose = ( event: React.FormEvent) => {
//     setShow(false)
//     if (event.refresh && onRefresh) onRefresh()
//   }

  const onShow = () => {
    setShow(true)
  }

  const room = visit.room ? (
    <div >(Кабинет: {visit.room})</div>
  ) : null

  const doctorName = visit.doctorName ? (
    <div >{visit.doctorName}</div>
  ) : null

  const cancel = visit.active ? (
    <button  onClick={onShow}>
        Отменить запись
      </button>
    
  ) : null

//   const edit = visit.active ? (
//     <Edit
//       show={show}
//       visit={visit}
//       patient={patient}
//       onClose={onClose}
//     />
//   ) : null

  return (
    <div  className="patient-item">
      
         <div className="patient-item-header">
                    <div>
                    
                        <p className="patient-item-title">{visit.specialityName}</p>
                        <p className="patient-item-doctor">Врач: {visit.doctorName}</p>
                        <p className="patient_time">
                         Время визита: {formatDate(visit.date)} в {formatTime(visit.from)}
                        </p>
                 
                      
                        
                    </div>
                    <span className={`patient-status-badge ${visit.active === 0 ? 'green' : 'blue'}`}>
                          {visit.active === 0 ? 'Приём завершён' : ''}
                        </span>
                  </div>

      </div>
      
     
   
  )
}
