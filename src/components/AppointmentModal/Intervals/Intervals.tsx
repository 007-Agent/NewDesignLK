import { Divide } from "lucide-react";
import React, { useState } from "react";
import { Usernow } from "../../../redux/slice/authSlice";
import { Patient } from "../../patientDetailsFull/PatientFull/PatientFull";
import Person from "./Person/Person";

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

export default function Intervals({
  user,
  patient,
  intervals,
}: IntervalsProps) {
  console.log(intervals, "INNI");
  const [selectedDoctor, setSelectedDoctor] = useState<Number | null>(null);
  const persons = intervals.map((person, index) => (
    <Person key={index} person={person} user={user} patient={patient} />
  ));
  return intervals.length ? (
    <div className="flex flex-col gap-y-[15px] font-['Inter']">{persons}</div>
  ) : null;
}
