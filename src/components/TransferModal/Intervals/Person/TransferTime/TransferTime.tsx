import React, { useState } from "react";
import "./cardtime.css";
import { Usernow } from "../../../../../redux/slice/authSlice";
import { Patient } from "../../../../patientDetailsFull/PatientFull/PatientFull";
import { X } from "lucide-react";
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
  onSign?: (visit: any) => void;
}

export function TransferTime({ user, person, patient, onSign }: CardTimeProps) {
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      weekday: "short",
    };
    return date.toLocaleDateString("ru-RU", options);
  };

  const handleDateClick = (index: number) => {
    setSelectedDateIndex(index);
    console.log("Выбран индекс даты:", index);
  };

  const handleTimeClick = (visit: any) => {
    if (onSign && selectedDateIndex !== null) {
      const selectedDateStr = person.dates[selectedDateIndex].date;
      onSign(visit);
    }
  };



  if (!person.dates || person.dates.length === 0) return null;

  const selectedDateObj =
    selectedDateIndex !== null ? person.dates[selectedDateIndex] : null;
  const intervals = selectedDateObj?.intervals || [];
  console.log(intervals, "intervals doctor");
  return (
    <div
      className="rounded-[10px]
  p-4
  mb-2.5
  animate-[slideDown_0.3s_ease-out]
  font-['Inter']
  w-full
  relative"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-4">
        <h4 className="m-0 text-[#46abf1] text-[15px] font-semibold">
          Выберите дату и время приёма
        </h4>
      </div>

      <div className="flex flex-col gap-4">
        <div
          className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))]
  max-[450px]:grid-cols-3
  gap-2"
        >
          {person.dates.map((d, idx) => (
            <button
              key={idx}
              className={`card-time-date-btn ${selectedDateIndex === idx ? "selected" : ""}`}
              onClick={() => handleDateClick(idx)}
            >
              {formatDate(d.date)}
            </button>
          ))}
        </div>

        {selectedDateIndex !== null && intervals.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(65px,1fr))] gap-1.5">
            {intervals.map((interval) => (
              <button
                key={interval.id}
                className="card-time-time-btn"
                onClick={() => handleTimeClick(interval)}
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
