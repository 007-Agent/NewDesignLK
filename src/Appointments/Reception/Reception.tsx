import React from 'react'
import { Calendar, Clock, User, MapPin, FileText } from 'lucide-react';
import { Patient } from '../../components/patientDetailsFull/PatientFull/PatientFull';
import './style.scss'
export interface Visit {
  cabinet: string;
  comment: string | null;
  date: string;          
  relevance: number;    
  resource: string;      
  room: string;          
  services: string;      
  speciality: string;    
  time: string;        
  visited: null;       
}
export interface PatientWithVisits {
  patient: Patient;
  visits: Visit[];
}
interface ReceptionProps {
  visit: PatientWithVisits;   // можно назвать item
}
export default function Reception({visit} : ReceptionProps) {
    const visited = visit;
    const { patient, visits } = visit;
      const formatDate = (dateStr: string) => {
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
      }
    console.log(patient, "ghghghg")
  return (
    <>

            <div  className="appointments-child-section">
              {/* Child Header */}
              <div className="appointments-child-header">
                <div className="appointments-child-avatar">
                  <User />
                </div>
                <div>
                  <h3>{patient.fio}</h3>
                  <p className="appointments-child-age">{patient.age} лет</p>
                </div>
                <span className="appointments-child-badge">
                  {visits.length} {visits.length === 1 ? 'запись' : 'записи'}
                </span>
              </div>
    
              {/* Appointments List */}
              <div className="appointments-list">
                {visits.map((visit, i) => (
                  <div key={i} className="appointment-card">
                    {/* Date and Time */}
                    
    
                    {/* Doctor Info */}
                    <div className="appointment-info">
                      <div className="appointment-doctor">
                        <div className="appointment-doctor-avatar">
                          <User />
                        </div>
                        <div>
                          <p className="appointment-doctor-name">{visit.resource}</p>
                          
                        </div>
                      </div>
    
                      {/* Service */}
                      <div className="appointment-detail">
                        <FileText />
                        <div>
                          <p className="appointment-label">Специальность</p>
                          <p className="appointment-value">{visit.speciality}</p>
                        </div>
                      </div>
    
                     <div className="appointment-actions">
                        <button className="appointment-btn-cancel">Отменить</button>
                        
                      </div>
                     
                    </div>
    
                    <div className="appointment-datetime">
                      <div className="appointment-date">
                        <Calendar />
                        <span>{formatDate(visit.date)}</span>
                      </div>
                      <div className="appointment-time">
                        <Clock />
                        <span>{visit.time}</span>
                      </div>
                    </div>
                    
                  </div>
                ))}
              </div>
            </div>
         
    </>
  )
}
