import React from 'react'
import "./vacinacya.scss"
import { formatDate } from '../../../../../utils/utils';
interface VaccinaItem {
  date: string;      // "2025-08-07"
  group: string;     // "Туб.Диагностика"
  name: string;      // "T-SPOT.TB"
  result: string;    // "otp"
  series: null;      // или можно any, если может быть чем-то другим
}

interface VacinaProps {
  vaccination: VaccinaItem;
   
}

class Vaccinacya extends React.Component<VacinaProps> {
    mounted: boolean = false;
  constructor(props : VacinaProps) {
    super(props)
    this.state = {
      results: []
    }
    
  
    
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
   
  }

render() {
    
    return (
      <div className="flex items-center gap-x-[25px] text-[18px] max-[450px]:text-[14px]">
        <div>{formatDate(this.props.vaccination.date)}</div>
        <div >{this.props.vaccination.group}</div>
        <div>({this.props.vaccination.name})</div>
        {this.props.vaccination.series ? (
          <div>серия: {this.props.vaccination.series}</div>
        ) : (
          ''
        )}
      </div>
    )
  }
}



export default Vaccinacya