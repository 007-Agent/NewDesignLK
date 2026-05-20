import React from 'react'

import "./disables.scss"
import { Patient } from '../PatientFull';
import Disable from './Disable/Disable';
import { Usernow } from '../../../../redux/authSlice';
import axios from 'axios';
interface DisableProps {
  patient: Patient;
  user: Usernow | null;
 
}
interface DisableState {
  items: any[];      // лучше заменить на конкретный тип анализа, если есть
  wait: boolean;
}
class Disables extends React.Component<DisableProps, DisableState > {
    mounted: boolean = false;
  constructor(props : DisableProps) {
    

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
    axios.post('/api/office/patient/disable', { patientId })
      .then(response => {
        if (this.mounted) {
          this.setState({ items: response.data.data });
          this.setState({ wait: false });
        }
      })
      .catch(error => {
        console.error('Ошибка загрузки анализов:', error);
       
      });
  }

  render() {
     if (this.state.wait) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40px' }}>
          <div className="spinner" /> {/* или ваша иконка */}
        </div>
      );
    }

    // 2. Загрузка окончена, данных нет
    // if (!this.state.items || this.state.items.length === 0) {
    //   return <div className="no-data-message">Нет доступных данных</div>;
    // }

    let items = this.state.items.map((v, i) => {
      return (
        <React.Fragment>
          <Disable key={i}  disable={v} />
        </React.Fragment>
      )
    })

    return (
      <React.Fragment>
        <div>
          {items}
        
        </div>
      </React.Fragment>
    )
  }
}



export default Disables