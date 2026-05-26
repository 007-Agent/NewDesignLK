import React from 'react'

export interface Medicament {
  date: string;           // Дата в формате YYYY-MM-DD
  diagnosis: string;      // Диагноз с кодом и описанием
  diagnosisCode: string;  // Код диагноза (МКБ-10)
  doctor: string;         // ФИО врача
  medicament: string;     // Назначенный препарат (форма, дозировка)
  tradeName: string;      // Торговое наименование (действующее вещество)
}
interface MedicProps {
    medicament: Medicament
} 
export default function Medicament(props : MedicProps) {
 const medicament = props.medicament;
 console.log(props.medicament, "RCR")
     const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};
   
    

    return (
        <div className="flex items-center gap-x-[10px] p-[5px] text-[18px] max-w-[750px] mx-auto font-['Inter'] max-[450px]:text-[15px]">
  <div className="block bg-gray-50 p-2.5 w-full flex flex-col gap-y-[10px]  ">
    <div className="flex gap-x-[15px]">
      <h2 className="text-[rgba(42,41,117,0.89)] font-medium">
        {formatDate(medicament.date)}
      </h2>
      <span>{medicament.diagnosisCode}</span>
      <span>{medicament.tradeName}</span>
    </div>
    <div>
      <p className="italic">{medicament.medicament}</p>
    </div>
  </div>
</div>
    );
}


