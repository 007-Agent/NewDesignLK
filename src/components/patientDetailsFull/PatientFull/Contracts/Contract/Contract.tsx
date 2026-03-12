import React from 'react'
import './contract.scss'
export interface ContractData {
  date: string;            
  dateSign: string | null; 
  from: string;           
  id: number;
  number: string;          
  relevance: boolean;      
  to: string;              
}

interface ContractProps {
  contract: ContractData;
   // или более конкретный тип для стилей
}
export default function Contract(props : ContractProps) {
    const contract = props.contract;
     const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};
   
    

    return (
        <div  className='contract_item'>
            <div >
                {contract.number}
            </div>
            <div >
                ({formatDate(contract.from)} &nbsp;-&nbsp; {formatDate(contract.to)})
            </div>
        </div>
    );

  
}
