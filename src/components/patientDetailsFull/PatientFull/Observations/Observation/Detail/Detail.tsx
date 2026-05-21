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
    <div className="max-w-[1000px] mx-auto font-['Inter']">
  <div className="mb-8">
    <h3 className="mb-3 text-xl font-semibold text-gray-900 border-l-4 border-blue-600 pl-3 max-[450px]:text-[16px]">
      Диагноз:
    </h3>
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm min-w-[600px] max-[450px]:max-[450px] max-[450px]:min-w-[0]">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="p-3 px-4 text-left font-semibold text-gray-800 border border-gray-200 max-[450px]:p-2">Код</th>
            <th className="p-3 px-4 text-left font-semibold text-gray-800 border border-gray-200 max-[450px]:p-2">Диагноз</th>
            <th className="p-3 px-4 text-left font-semibold text-gray-800 border border-gray-200 max-[450px]:p-2">Дата постановки</th>
            <th className="p-3 px-4 text-left font-semibold text-gray-800 border border-gray-200 max-[450px]:p-2">Дата перерегистрации</th>
            <th className="p-3 px-4 text-left font-semibold text-gray-800 border border-gray-200 max-[450px]:p-2">Дата снятия</th>
          </tr>
        </thead>
        <tbody>
          {diagnoses.map((diag, idx) => (
            <tr key={idx} className="[&:last-child_td]:border-b-0">
              <td className="p-3 px-4 text-gray-700 border border-gray-200 max-[450px]:p-2">{diag.code}</td>
              <td className="p-3 px-4 text-gray-700 border border-gray-200 max-[450px]:p-2">{diag.name}</td>
              <td className="p-3 px-4 text-gray-700 border border-gray-200 max-[450px]:p-2">{diag.from}</td>
              <td className="p-3 px-4 text-gray-700 border border-gray-200 max-[450px]:p-2">{diag.reg}</td>
              <td className="p-3 px-4 text-gray-700 border border-gray-200 max-[450px]:p-2">{diag.to}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  
  );
};

