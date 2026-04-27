import React from 'react'
import Observation from './Observation/Observation';
import './observations.scss'
import { Usernow } from '../../../../redux/authSlice';
import { Patient } from '../PatientFull';
import axios from 'axios';
interface ObservationProps {
  patient: Patient;
  user: Usernow | null;
 
}
interface AnalyzesState {
  items: any[];      // лучше заменить на конкретный тип анализа, если есть
  
}

class Observations extends React.Component<ObservationProps, AnalyzesState > {
     mounted: boolean = false;
  constructor(props : ObservationProps) {
    super(props)
    this.state = {
      items: []
    }
    this.refresh = this.refresh.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.refresh()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  refresh() {
    const patientId = this.props.patient.id;
    
    axios.post('/rest/office/patient/observations', { patientId })
      .then(response => {
        if (this.mounted) {
          this.setState({ items: response.data.data });
        }
      })
      .catch(error => {
        console.error('Ошибка загрузки анализов:', error);
      
      });
  }

  render() {
    const results = this.state.items;
    if (!results || results.length === 0) {
      return <div className="no-data-message">Нет доступных данных</div>;
    }
    let items = null
    if (this.state.items) {
      items = this.state.items.map((v, i) => {
        return (
          <div key={i} >
            <Observation  observation={v} />
          </div>
        )
      })
    }

    return (
      <div>
        {items}
     
      </div>
    )
  }
}



export default Observations