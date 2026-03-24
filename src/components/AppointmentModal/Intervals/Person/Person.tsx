import React, {useState} from 'react'
import { Usernow } from '../../../../redux/authSlice';
import { Patient } from '../../../patientDetailsFull/PatientFull/PatientFull';
import Interval from './Interval/Interval';
import { CardTime } from './CardTime/CardTime';
import { X } from 'lucide-react';
import './person.scss'
interface TimeSlot {
  time: string;
  id: number; 
}

// Одна дата с интервалами
interface DateItem {
  date: string;
  intervals: TimeSlot[];
}

interface GroupedItem {
  branch: { id: number; name?: string };
  person: { id: number; name?: string; category?: number };
  dates: DateItem[];
}
interface ProcessedPerson {
  branch: { id: number; name?: string };
  person: { id: number; name?: string; category?: number };
  dates: (DateItem & { intervals: TimeSlot[] })[];
}

interface PersonProps {
    user: Usernow | null;
    patient : Patient;
    person: GroupedItem;
}
export default function Person(props : PersonProps) {
    const person = props.person;
    
     const [visitId, setVisitId] = useState(0)
  const [index, setIndex] = useState(-1)
   const [selectedDoctor, setSelectedDoctor] = useState<Number | null>(null);
   const [isExpanded, setIsExpanded] = useState(false);
  const now = new Date();
  const currentTime = now.getHours() + ':' + now.getMinutes();
    console.log(props.person, "PERSON")

 

//   const onSign = (event : React.MouseEvent) => {
//     const id = event.visit?.id
//     console.log(id, 'IIII')
//     if (id > 0) setVisitId(id)
//     else setVisitId(0)
//   }
//   const onSign = (visit: { id: number }) => {
//     setVisitId(visit.id);
//     // Здесь можно отправить запрос на запись
//     console.log('Выбран visitId:', visit.id);
//   };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  
 const onDateClick = (index : number) => (event: React.MouseEvent)=>{
    event.preventDefault()
    event.stopPropagation()
    setIndex(index)
  }
const formatDateShort = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}`;
};

// Функция форматирования даты в "25.03.2026"
const formatDateDot = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
   const processedPerson   = person
    ? {
        ...person,
        dates:
          person.dates?.map((date : any) => {
            // Проверяем, сегодняшняя ли это дата
            const today = new Date()
            const todayString = today.toISOString().split('T')[0]
            const isTodayDate = date.date === todayString

            // Фильтруем интервалы только для сегодняшней даты
            const intervals = isTodayDate
              ? date.intervals?.filter((visit : any) => {
                  const now = new Date()
                  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
                  return visit.time && visit.time.substring(0, 5) >= currentTime
                }) || []
              : date.intervals || [] // Для не-сегодняшних оставляем все интервалы

            return {
              ...date,
              intervals
            }
          }) || []
      }
    : null;
    console.log(processedPerson, "PRCICI")
  
    const date = formatDateShort(person.dates[0].date)
  return (
    <>
     
   <div
        className={`doctor-card ${isExpanded ? 'selected' : ''}`}
        onClick={handleCardClick}
      >
        {isExpanded &&  <X size={24} className='clear_icon'/> }
       
                    <div className="doctor-info">
                      <h3 className="doctor-namee">{person.person.name}</h3>
                   
                      <div className="doctor-availability">
                        Записи доступны с {date}
                      </div>
                    </div>
                    {isExpanded && (
        <CardTime
          person={props.person}
          user={props.user}
          patient={props.patient}
          
     
        />
      )}
                  </div>
                  
                  
    </>
   
  )
}
