import React, {useState, useEffect} from 'react';
import './visit.scss';
import axios from 'axios';
// Интерфейсы данных


interface VisitItem {
    id: number;
    dateVisit: string;      // дата приёма в формате YYYY-MM-DD
    monthPlan: number;      // месяц назначения
    yearPlan: number;       // год назначения
    description: string;    // примечание
}
interface PatientId{
    id: number;
}

interface VisitTableProps {
  
 id: number;  
}

 export function Visit ({ id } : VisitTableProps)  {


    const [visits, setVisits] = useState<VisitItem[]>([]);
  
 useEffect(() => {
        // Простейший запрос
        axios.post('/rest/office/patient/visit', { id: id })
            .then(response => {
                console.log('Ответ сервера:', response.data);
                // Если response.data — массив, то вот он
                if (Array.isArray(response.data.data)) {
                    console.log('Массив диагнозов:', response.data);
                    setVisits(response.data.data)
                } else {
                    console.log('Структура ответа:', JSON.stringify(response.data, null, 2));
                }
            })
            .catch(error => {
                console.error('Ошибка запроса:', error);
            });
    }, [id]);

  return (
    <div className="medical-tables">
     
    
       

      <div className="table-section">
        <h3>Посещения:</h3>
        <div className="table-wrapper">
          <table className="visits-table">
            <thead>
              <tr>
                <th>Месяц назн.</th>
                <th>Год назн.</th>
                <th>Дата приёма</th>
                <th>Примечание</th>
              </tr>
            </thead>
            <tbody>
              {visits.map((visit, idx) => (
                <tr key={idx}>
                  <td>{visit.monthPlan}</td>
                  <td>{visit.yearPlan}</td>
                  <td>{visit.dateVisit}</td>
                  <td>{visit.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};