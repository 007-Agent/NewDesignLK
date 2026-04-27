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
 
}
class Disables extends React.Component<DisableProps, DisableState > {
    mounted: boolean = false;
  constructor(props : DisableProps) {


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
    
    axios.post('/api/office/patient/disable', { patientId })
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