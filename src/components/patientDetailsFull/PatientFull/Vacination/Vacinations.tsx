import React from 'react'
import "./vacin.scss"
import { Printer } from 'lucide-react';
import { Usernow } from '../../../../redux/authSlice';
import { Patient } from '../PatientFull';
import Vaccinacya from './Vacinacya/Vaccinacya';
import axios from 'axios';
interface AnalyzesProps {
  patient: Patient;
  user: Usernow | null;

 
}
interface AnalyzesState {
  items: any[];      // лучше заменить на конкретный тип анализа, если есть
  orderId: null;
 
}
class Vaccinations extends React.Component<AnalyzesProps,AnalyzesState> {
      mounted: boolean = false;
  constructor(props : AnalyzesProps) {
    super(props)
    this.state = {
      items: [],
      orderId: null
    }
    this.refresh = this.refresh.bind(this)
    // this.handleDownload = this.handleDownload.bind(this)
  }

  componentDidMount() {
    this.mounted = true
    this.refresh()
  }

  componentWillUnmount() {
    this.mounted = false
  }

handleDownload = async () => {
  const patientId = this.props.patient.id;
  const orderId = this.state.orderId;
  const fileName = 'Vaccination.pdf';
  
  
 try {
    const response = await axios.get(`/api/office/vaccination/pdf?patientId=${patientId}&analyzeId=${orderId}&fileName=${fileName}`, {
  responseType: 'blob',
});
    const blob = response.data;
    const link = document.createElement('a');
    const objectUrl = URL.createObjectURL(blob);
    link.href = objectUrl;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.error('Ошибка скачивания PDF:', error);
    // показать уведомление пользователю
  }
};
  refresh() {
    const patientId = this.props.patient.id;
   
    axios.post('/api/office/patient/vaccinations', { patientId })
      .then(response => {
        if (this.mounted) {
          this.setState({ items: response.data.data});
        }
      })
      .catch(error => {
        console.error('Ошибка загрузки анализов:', error);
        if (this.mounted) {
         
        }
      });
  }

  render() {
    const results = this.state.items;
    if (!results || results.length === 0) {
      return <div className="no-data-message">Нет доступных данных</div>;
    }
    let items = this.state.items.map((v, i) => {
      return <Vaccinacya key={i}  vaccination={v} />
    })
    return (
      <React.Fragment>
        <div >
           <Printer className='print_vac' onClick={this.handleDownload}/>
        </div>
        {items}
    
      </React.Fragment>
    )
  }
}



export default Vaccinations
