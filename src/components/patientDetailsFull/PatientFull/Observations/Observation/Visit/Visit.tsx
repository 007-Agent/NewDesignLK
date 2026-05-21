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
   <div className="max-w-[1000px] mx-auto font-sans">
  <div className="mb-8">
    <h3 className="mb-3 text-xl font-semibold text-gray-900 border-l-4 border-blue-600 pl-3 max-[450px]:text-[16px]">
      Посещения:
    </h3>
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full border-collapse text-sm min-w-[600px] max-[450px]:text-[14px] max-[450px]:max-[450px] max-[450px]:min-w-[0]">
        <thead>
          <tr className="bg-gray-50 border-b-2 border-gray-200">
            <th className="p-3 px-4 text-left font-semibold text-gray-800 border-b border-gray-200 max-[640px]:p-2 max-[640px]:px-3">
              Месяц назн.
            </th>
            <th className="p-3 px-4 text-left font-semibold text-gray-800 border-b border-gray-200 max-[640px]:p-2 max-[640px]:px-3">
              Год назн.
            </th>
            <th className="p-3 px-4 text-left font-semibold text-gray-800 border-b border-gray-200 max-[640px]:p-2 max-[640px]:px-3">
              Дата приёма
            </th>
            <th className="p-3 px-4 text-left font-semibold text-gray-800 border-b border-gray-200 max-[640px]:p-2 max-[640px]:px-3 visits-table-last">
              Примечание
            </th>
          </tr>
        </thead>
        <tbody>
          {visits.map((visit, idx) => (
            <tr key={idx} className="[&:last-child_td]:border-b-0">
              <td className="p-3 px-4 text-gray-700 border-b border-gray-200 max-[640px]:p-2 max-[640px]:px-3">
                {visit.monthPlan}
              </td>
              <td className="p-3 px-4 text-gray-700 border-b border-gray-200 max-[640px]:p-2 max-[640px]:px-3">
                {visit.yearPlan}
              </td>
              <td className="p-3 px-4 text-gray-700 border-b border-gray-200 max-[640px]:p-2 max-[640px]:px-3">
                {visit.dateVisit}
              </td>
              <td className="p-3 px-4 text-gray-500 italic border-b border-gray-200 max-[640px]:p-2 max-[640px]:px-3">
                {visit.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};