import React, {useEffect, useState} from 'react';
import { PatientCard } from './PatientCard/PatientCard';
import { Users } from 'lucide-react';
import { Usernow } from '../redux/authSlice';
import './patientsPage.scss'
import axios from 'axios';
import {RefreshCw} from 'lucide-react'

interface ProfilePatientsProps {
  user: Usernow | null;
}
export function PatientsPage({user} : ProfilePatientsProps) {
  console.log(user)
  const [patients, setPatients] = useState([]);
 const [wait, setWait] = useState(false);
   const fetchPatients = async () => {
   setWait(true);
    try {
      const response = await axios.post('/api/office/patient/list', {});
      setPatients(response.data.data);
    } catch (err) {
      console.log(err)
    } finally {
      setWait(false); // выключаем спиннер после завершения (даже при ошибке)
    }
  };
  
  useEffect(() => {
    if(user !== null) {
    fetchPatients();
  }
    
  }, [user]);

  return (
    <div>
      { wait ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px',
          
        }}>
           
          <RefreshCw className='spinner'/>
        </div>
      ) : (
        <>
          <div className="patients-page-header">
        <div className="patients-header-icon">
          <Users />
        </div>
        <div className="patients-header-title">
          <h2>Пациенты</h2>
          <p className="patients-header-count">Всего пациентов: {patients.length}</p>
        </div>
      </div>

      <div className="patients-grid">
        {patients.map((patient, index) => (
          <PatientCard
            key={index}
            user={user}
            patient={patient}
           
           
          />
        ))}
      </div>
        </>
        
      )}
    </div>
  );
}