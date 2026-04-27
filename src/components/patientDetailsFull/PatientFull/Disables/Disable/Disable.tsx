import React from 'react'
import './disable.scss'
import { formatDate } from '../../../../../utils/utils';
interface DisableContent{
    dateBegin: string;
    number: number;
    person: string;
    dateFrom: string;
    dateTo: string;
}
interface DisableProps{
    disable: DisableContent;
}

class Disable extends React.Component<DisableProps> {
  render() {
    
    const begin = this.props.disable.dateBegin ? (
      <div >
        <div >{'приступить к работе с:'}</div>
        <div >{formatDate(this.props.disable.dateBegin)}</div>
      </div>
    ) : null
    return (
      <div  >
        <div >{'№'}</div>
        <div >{this.props.disable.number}</div>
        <div >{this.props.disable.person}</div>
        <div >{'на период: '}</div>
        <div >
          {formatDate(this.props.disable.dateFrom) +
            ' - ' +
            formatDate(this.props.disable.dateTo)}
        </div>
        {begin}
      </div>
    )
  }
}



export default Disable
