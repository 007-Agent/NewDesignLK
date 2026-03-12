import React, { useState, useEffect} from 'react'
import { Calendar, Clock, User, MapPin, FileText } from 'lucide-react';
import './AppointmentsPage.scss';
import { Usernow } from '../redux/authSlice';
import axios from 'axios';
import Reception from './Reception/Reception';
interface AppointmentsProps {
 
  user: Usernow | null;
}
export function AppointmentsPage(props : AppointmentsProps) {
  const user = props.user;
  const [visits, setVisits] = useState([]);
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

  const fetchPatients = async () => {
   
    try {
      const response = await axios.post('/api/office/relevance/visits', {});
      setVisits(response.data.data);
    } catch (err) {
      console.log(err)
    } 
  };
  
  useEffect(() => {
   
    fetchPatients();
  
    
  }, []);
  const result = visits.map((v, i) => (
    <Reception visit={v}/>
  ))
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

      {result}
      
    </div>
  );
}
