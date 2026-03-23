import { Divide } from 'lucide-react'
import React from 'react'
import { Usernow } from '../../../redux/authSlice';
import { Patient } from '../../patientDetailsFull/PatientFull/PatientFull';
import Person from './Person/Person';

interface TimeSlot {
  time: string;
  id: number; 
}

// Одна дата с интервалами
interface DateItem {
  date: string;
  intervals: TimeSlot[];
}

interface GroupedItem {
  branch: { id: number; name?: string };
  person: { id: number; name?: string; category?: number };
  dates: DateItem[];
}

interface IntervalsProps {
  intervals: GroupedItem[];
  user: Usernow | null;
  patient: Patient;
  onSelect?: (visitId: number, date: string, time: string) => void; // опционально
}

export default function Intervals({user, patient, intervals} : IntervalsProps) {

  console.log(intervals, "INNI")
 
  const persons = intervals.map((person, index) => (
    <Person
      
      key={index}
      person={person}
      user={user}
      patient={patient}
      
    />
  ))
  return intervals.length ? <div >{persons}</div> : null
}

