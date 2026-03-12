import React, {useEffect, useState} from 'react';
import { PatientCard } from './PatientCard/PatientCard';
import { Users } from 'lucide-react';
import { Usernow } from '../redux/authSlice';
import './patientsPage.scss'
import axios from 'axios';

interface ProfilePatientsProps {
  user: Usernow | null;
}
export function PatientsPage({user} : ProfilePatientsProps) {
  console.log(user)
  const [patients, setPatients] = useState([]);
 
   const fetchPatients = async () => {
   
    try {
      const response = await axios.post('/api/office/patient/list', {});
      setPatients(response.data.data);
    } catch (err) {
      console.log(err)
    } 
  };
  
  useEffect(() => {
    if(user !== null) {
    fetchPatients();
  }
    
  }, [user]);

  return (
    <div>
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
    </div>
  );
}