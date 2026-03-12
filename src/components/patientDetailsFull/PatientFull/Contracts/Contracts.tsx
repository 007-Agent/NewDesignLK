import React, { useState, useEffect, useRef} from 'react';
import { Usernow } from '../../../../redux/authSlice';
import axios from 'axios';
import Contract from './Contract/Contract';
import './contracts.scss'
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



interface Contracts {
  patient: Patient;
  user: Usernow | null;
 
}
function Contracts({patient, user} : Contracts) {
  const [items, setItems] = useState([]);
  const [wait, setWait] = useState(false);
  const isMounted = useRef(true);
  const patientId = patient.id;
  // Сброс флага монтирования при размонтировании
 

  // Функция загрузки данных
  const fetchVisits = () => {
    if (!patient.id) return; // ничего не делаем, если patientId не передан

    setWait(true);
    axios
        .post('/api/office/patient/contracts', { patientId })
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
    fetchVisits()
    return () => {
      isMounted.current = false;
    };
  }, [patientId]);

  
  

  // Рендеринг элементов списка
  const itemsElements = items.map((v, i) => (
    <Contract key={i}  contract={v} />
  ));

  return (
    <div className='contracts_content'>
      {itemsElements}
      
    </div>
  );
}

export default Contracts