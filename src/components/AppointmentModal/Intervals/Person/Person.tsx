import React from 'react'
import { Usernow } from '../../../../redux/authSlice';
import { Patient } from '../../../patientDetailsFull/PatientFull/PatientFull';
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

interface PersonProps {
    user: Usernow | null;
    patient : Patient;
    person: GroupedItem[];
}
export default function Person(props : PersonProps) {
    console.log(props.person, "PERSON")
  return (
    <div>Person</div>
  )
}
