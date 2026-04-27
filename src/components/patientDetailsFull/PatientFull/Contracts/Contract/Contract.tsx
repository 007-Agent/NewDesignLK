import React from 'react'
import './contract.scss'
import { formatDate } from '../../../../../utils/utils';
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
