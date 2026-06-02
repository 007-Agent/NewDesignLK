import React, { useState, useEffect} from 'react'
import { Calendar, Clock, User, MapPin, FileText } from 'lucide-react';
import {RefreshCw} from 'lucide-react'
import './AppointmentsPage.scss';
import { Usernow } from '../../redux/authSlice';
import axios from 'axios';
import { Spinner } from '../../components/Spinner/Spinner';
import Reception from './Reception/Reception';
interface AppointmentsProps {
 
  user: Usernow | null;
}
export function AppointmentsPage(props : AppointmentsProps) {
  const user = props.user;
  console.log(props.user)
  const [visits, setVisits] = useState([]);
 const [wait, setWait] = useState(false);

  const fetchPatients = async () => {
    setWait(true); // включаем спиннер перед запросом
    try {
      const response = await axios.post('/api/office/relevance/visits', {});
      setVisits(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setWait(false); // выключаем спиннер после завершения (даже при ошибке)
    }
  };
  
  useEffect(() => {
   
    fetchPatients();
  
    
  }, [user]);
  const result = visits.map((v, i) => (
    <Reception visit={v} key={i}/>
  ))
  return (
    <div className="appoint__str">
      <div className="appointments-page-header">
        <div className="appointments-header-icon">
          <Calendar />
        </div>
        <div className="appointments-header-title">
          <h2 className='appoinments__doctors'>Записи к врачу</h2>
          {/* <p className="appointments-header-count">
            Активных записей: {appointmentsData.reduce((acc, child) => acc + child.appointments.length, 0)}
          </p> */}
        </div>
      </div>
    <div>
      {wait ? (
          < Spinner />
        ) : visits.length === 0 ? (
          <div className="appointments-empty">
            На данный момент записи к врачу отсутствуют
          </div>
        ) : (
          result
        )}
    </div>
    <p className='number__opportunity'>Единый телефон поддержки +7 495 727-11-66</p>
    </div>
    
  );
}
