import React from 'react'
import './medic.scss'
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
        <div  className='medic_item'>
            <div className='Medicament__list'>
            <div className='medic__result'>
                <h2>{formatDate(medicament.date)}</h2>
                <span>{ medicament.diagnosisCode}</span>
                <span>{medicament.tradeName}</span>
               
            </div>
            <div >
                <p className='paraph'>{medicament.medicament}</p>
            </div>
                
            </div>
            
        </div>
    );
}


