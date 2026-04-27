import React from 'react';
import { Usernow } from '../../../../../redux/authSlice';
import { Patient } from '../../PatientFull';
import { formatDate } from '../../../../../utils/utils';
import "./analysis.scss"
interface AnalysisItem {
  date: string;
  id: number;
  name: string;
  results: any[];
}

interface AnalysisProps {
  patientId: number;
  
  analysis: AnalysisItem; // обязательно
  downloads?: any;
}

interface AnalysisState {
  show: boolean;
}

class Analysis extends React.Component<AnalysisProps, AnalysisState> {
  constructor(props: AnalysisProps) {
    super(props);
    this.state = { show: false };
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow(event: any) {
    if (event.show !== this.state.show) {
      this.setState({ show: event.show });
    }
  }


  render() {
    const label = (
      <>
      <div>{formatDate(this.props.analysis.date)}</div>
        <div>{this.props.analysis.name}</div>
      </>
        
      
    );

    return (
      <div onClick={() => this.setState({ show: !this.state.show })} className='analysis__box'>
        {label}
      </div>
    );
  }
}

export default Analysis;