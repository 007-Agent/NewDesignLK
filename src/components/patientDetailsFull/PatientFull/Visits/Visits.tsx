import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { Usernow } from '../../../../redux/authSlice';
import { Visit } from './Visit/Visit';
import { Visited } from './Visit/Visit';
import './visits.scss'
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



interface PatientDetailPageProps {
  patient: Patient;
  user: Usernow;
 
}
export function Visits ({patient, user} :PatientDetailPageProps ) {
    const [items, setItems] = useState<Visited[]>([]);
  console.log(items, 'UTUT')
  const [message, setMes] = useState('')
  const [wait, setWait] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const clientsPerPage = 20
  const isMounted = useRef(true)

  const fetchVisits = () => {
    const patientId = patient?.id || 0
    // console.log(patientId, 'EERRRE')
    if (patientId > 0) {
      setWait(true)
      axios
        .post('/api/visit/list', { patientId })
        .then(response => {
          if (isMounted.current) {
            // console.log(response.data.data, 'RDRDRD')
            setItems(response.data.data)
            setWait(false)
            setCurrentPage(1) // при загрузке сбрасываем страницу на первую
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setWait(false)
          }
        })
    }
  }
  const useMessageEffect = (info : any) => {
   
    setMes(info)
  }
  useEffect(() => {
    if (message.length !== 0) {
      fetchVisits()
    }
  }, [message])

  useEffect(() => {
    isMounted.current = true
    fetchVisits()
    return () => {
      isMounted.current = false
    }
  }, [patient]) // при изменении patient перезагружаем визиты

  
  const filteredItems = items.filter(item => item.active === 0 )
  const visitItems = filteredItems
    .slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage)
    .map((v, i) => (
      <Visit
        key={i}
        
        patient={patient}
        visit={v}
        onRefresh={fetchVisits}
        onGetMessage={useMessageEffect}
      />
    ))

  const totalPages = Math.ceil(items.length / clientsPerPage)

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }
    return (
      <div>
            <div className="patient-items-list">{visitItems}</div>

      <div className='pajer_list'>
        <button
        className='button_click'
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          >
          ← Предыдущая
        </button>
        <span>
          Страница {currentPage} из {totalPages}
        </span>
        <button
         className='button_click'
          onClick={goToNextPage}
          disabled={currentPage === totalPages || totalPages === 0}>
          Следующая →
        </button>
      </div>
      </div>
    )
     
}