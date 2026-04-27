import React from 'react';
import axios from 'axios';
import "./analyzes.scss"
import { Usernow } from '../../../../redux/authSlice';
import { Patient } from '../PatientFull';
import Analysis from './Analysis/Analysis';

interface AnalyzesProps {
  patient: Patient;
  user: Usernow | null;
 
}
interface AnalyzesState {
  items: any[];      // лучше заменить на конкретный тип анализа, если есть
  wait: boolean;
}
class Analyzes extends React.Component<AnalyzesProps, AnalyzesState> {
  mounted: boolean = false;
  constructor(props: AnalyzesProps) {
    super(props);
    this.state = {
      items: [],
      wait: false,
    
    };
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    this.mounted = true;
    this.refresh();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  refresh() {
    const patientId = this.props.patient.id;
    this.setState({ wait: true });
    axios.post('/api/office/patient/analyzes', { patientId })
      .then(response => {
        if (this.mounted) {
          this.setState({ items: response.data.data, wait: false });
        }
      })
      .catch(error => {
        console.error('Ошибка загрузки анализов:', error);
        if (this.mounted) {
          this.setState({ wait: false });
        }
      });
  }

  render() {
    if (!this.state.items || this.state.items.length === 0) {
      return <div className="no-data-message">Нет доступных данных</div>;
    }
    let items = this.state.items.map((v, i) => (
      <Analysis
        key={i}
          patientId={this.props.patient.id}
          analysis={v}
        
     
      />
    ));

    return (
      <div className='analyzes__content'>
        {items}
   
      </div>
    );
  }
}

export default Analyzes;