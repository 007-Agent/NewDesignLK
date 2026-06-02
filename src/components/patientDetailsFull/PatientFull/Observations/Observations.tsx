import React from 'react'
import Observation from './Observation/Observation';
import './observations.scss'
import { Usernow } from '../../../../redux/authSlice';
import {RefreshCw} from 'lucide-react'
import { Patient } from '../PatientFull';
import { Spinner } from '../../../Spinner/Spinner';
import axios from 'axios';
interface ObservationProps {
  patient: Patient;
  user: Usernow | null;
 
}
interface AnalyzesState {
  items: any[];      // лучше заменить на конкретный тип анализа, если есть
  wait: boolean
}

class Observations extends React.Component<ObservationProps, AnalyzesState > {
     mounted: boolean = false;
  constructor(props : ObservationProps) {
    super(props)
    this.state = {
      items: [],
      wait: true
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
     this.setState({ wait: true });
    axios.post('/rest/office/patient/observations', { patientId })
      .then(response => {
        if (this.mounted) {
          this.setState({ items: response.data.data });
           this.setState({ wait: false });
        }
      })
      .catch(error => {
        console.error('Ошибка загрузки анализов:', error);
         this.setState({ wait: false });
      });
  }

  render() {
   if (this.state.wait) {
      return <Spinner />;
    }

  
    const results = this.state.items;
 
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