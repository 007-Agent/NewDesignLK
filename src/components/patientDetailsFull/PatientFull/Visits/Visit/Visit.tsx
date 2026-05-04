import React, { useState } from 'react'
import './visit.scss'
import { formatDate } from '../../../../../utils/utils';
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

const formatTime = (timeStr: string) => {
  return timeStr.slice(0, 5); // "10:00" из "10:00:00"
};

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
    <button  onClick={onShow}   className="cancel-button" 
          
          aria-label="Отменить запись">
        Отменить запись
      </button>
    
  ) : null

  const edit = visit.active ? (
    <Edit
      show={show}
      visit={visit}
      patient={patient}
    
    />
  ) : null

  return (
    <div  className="visit-item">
      
         <div className="visit-item-header">
                    <div className='visit__card'>
                         <p className="visit_time">
                         {formatDate(visit.date)}   {formatTime(visit.from)}
                        </p>
                        <p className="visit-item-title">{visit.specialityName}</p>
                        <p className="visit-item-doctor">Врач: {visit.doctorName}</p>
                       
                 
                      
                        
                    </div>
                     {visit.active === 0 ? (
        <span className={`visit-status-badge green`}>
          Приём завершён
        </span>
      ) : (
       cancel
      )}
                  </div>

      </div>
      
     
   
  )
}
