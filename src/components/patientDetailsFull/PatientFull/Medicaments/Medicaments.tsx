import React, { useState, useEffect, useRef} from 'react';
// import Medicament from './Medicament'
import './medicaments.scss'
import { Usernow } from '../../../../redux/authSlice';
import {RefreshCw} from 'lucide-react'
import { Patient } from '../PatientFull';
import  Medicament  from './Medocament/Medicament';
import axios from 'axios';
interface MedicamentsProps {
  patient: Patient;
  user: Usernow | null;

}
export default function Medicaments({patient, user} : MedicamentsProps) {

    const [items, setItems] = useState([]);
      const [wait, setWait] = useState(true);
      const isMounted = useRef(true);
      const patientId = patient.id;

      const fetchMedicaments = () => {
    if (!patient.id) return; // ничего не делаем, если patientId не передан

    setWait(true);
    axios
        .post('/api/office/patient/medicaments', { patientId })
     .then(response => {
          if (isMounted.current) {
            // console.log(response.data.data, 'RDRDRD')
            setItems(response.data.data)
            setWait(false)
            
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setWait(false)
          }
        })
     
     
     

   
    
  };

  // Загружаем данные при монтировании и при изменении patientId
 useEffect(() => {
    isMounted.current = true;
    fetchMedicaments()
    return () => {
      isMounted.current = false;
    };
  }, [patientId]);
  console.log(items, "TT")
  if (wait) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40px' }}>
        <RefreshCw className="spinner" />
      </div>
    );
  }

  // 2. Если загрузка окончена, но данных нет – сообщение
  // if (!items || items.length === 0) {
  //   return <div className="no-data-message">Нет доступных данных</div>;
  // }

   const itemsMedicaments = items.map((v, i) => (
      <Medicament key={i}  medicament={v} />
    ));
  return (
    <div>{itemsMedicaments}</div>
  )
}
