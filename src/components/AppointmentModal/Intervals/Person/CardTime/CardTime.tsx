import React, { useState } from 'react';
import './cardtime.scss';
import { Usernow } from '../../../../../redux/authSlice';
import { Patient } from '../../../../patientDetailsFull/PatientFull/PatientFull';
import { X } from 'lucide-react';
interface TimeSlot {
  time: string;
  id: number;
}

interface DateItem {
  date: string;
  intervals: TimeSlot[];
}

interface GroupedItem {
  branch: { id: number; name?: string };
  person: { id: number; name?: string; category?: number };
  dates: DateItem[];
}

interface CardTimeProps {
  user: Usernow | null;
  patient: Patient;
  person: GroupedItem;
  onSign?: (visitId: number, date: string, time: string) => void;
}

export function CardTime({ user, person, patient, onSign }: CardTimeProps) {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      weekday: 'short',
    };
    return date.toLocaleDateString('ru-RU', options);
  };

  const handleDateClick = (index: number) => {
    setSelectedDateIndex(index);
    console.log('Выбран индекс даты:', index);
  };


  const handleTimeClick = (visitId: number, time: string) => {
    if (onSign && selectedDateIndex !== null) {
      const selectedDateStr = person.dates[selectedDateIndex].date;
      onSign(visitId, selectedDateStr, time);
    }
  };

  if (!person.dates || person.dates.length === 0) return null;

  const selectedDateObj = selectedDateIndex !== null ? person.dates[selectedDateIndex] : null;
  const intervals = selectedDateObj?.intervals || [];

  return (
    <div className="card-time" onClick={(e) => e.stopPropagation()}>
      <div className="card-time-header">
        <h4>Выберите дату и время приёма</h4>
      </div>

      <div className="card-time-content">
        <div className="card-time-dates">
          {person.dates.map((d, idx) => (
            <button
              key={idx}
              className={`card-time-date-btn ${selectedDateIndex === idx ? 'selected' : ''}`}
              onClick={() => handleDateClick(idx)}
            >
              {formatDate(d.date)}
            </button>
          ))}
        </div>

        {selectedDateIndex !== null  && intervals.length > 0 && (
          <div className="card-time-times">
          
           
              {intervals.map((interval) => (
                <button
                  key={interval.id}
                  className="card-time-time-btn"
                  onClick={() => handleTimeClick(interval.id, interval.time)}
                >
                  {interval.time.slice(0, 5)}
                </button>
              ))}
            
          </div>
        )}
        
      </div>
    </div>
  );
}