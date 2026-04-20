import React from 'react'
import "./vacinacya.scss"

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


  formatDate (dateStr: string)  {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
}

 

  render() {
    
    return (
      <div  className='main__content'>
        <div>{this.formatDate(this.props.vaccination.date)}</div>
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