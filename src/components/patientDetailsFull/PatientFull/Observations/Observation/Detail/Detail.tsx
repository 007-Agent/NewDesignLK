import React, {useState, useEffect} from 'react';
import './detail.scss';
import axios from 'axios';
// Интерфейсы данных
interface DiagnosisItem {
    id: number;
    code: string;           // код МКБ (например, "Q25.0")
    name: string;           // название диагноза
    from: string;           // дата постановки (YYYY-MM-DD)
    reg: string;            // дата перерегистрации (YYYY-MM-DD)
    to: string;             // дата снятия (YYYY-MM-DD)
    healthGroup: string;    // группа здоровья (например, "III")
    healthGroupId: number;  // идентификатор группы здоровья
}



interface MedicalTablesProps {
 
 id: number;  
}

 export function Detail ({ id } : MedicalTablesProps)  {

 const [diagnoses, setDiagnoses] = useState<DiagnosisItem[]>([]);

   
 useEffect(() => {
        // Простейший запрос
        axios.post('/rest/office/patient/diagn', { id: id })
            .then(response => {
                console.log('Ответ сервера:', response.data);
                // Если response.data — массив, то вот он
                if (Array.isArray(response.data.data)) {
                    console.log('Массив диагнозов:', response.data);
                    setDiagnoses(response.data.data)
                } else {
                    console.log('Структура ответа:', JSON.stringify(response.data, null, 2));
                }
            })
            .catch(error => {
                console.error('Ошибка запроса:', error);
            });
    }, [id]);
  console.log(diagnoses, "diagnosiss")
  return (
    <div className="medical-tables">
      <div className="table-section">
        <h3>Диагноз:</h3>
        <div className="table-wrapper">
          <table className="diagnosis-table">
            <thead>
              <tr>
                <th>Код</th>
                <th>Диагноз</th>
                <th>Дата постановки</th>
                <th>Дата перерегистрации</th>
                <th>Дата снятия</th>
              </tr>
            </thead>
            <tbody>
              {diagnoses.map((diag, idx) => (
                <tr key={idx}>
                  <td>{diag.code}</td>
                  <td>{diag.name}</td>
                  <td>{diag.from}</td>
                  <td>{diag.reg}</td>
                  <td>{diag.to}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      
      </div>
  
  );
};