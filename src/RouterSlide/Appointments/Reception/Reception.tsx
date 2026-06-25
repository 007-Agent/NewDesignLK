import React, { useState } from "react";
import { Calendar, Clock, User, MapPin, FileText } from "lucide-react";
import { Patient } from "../../../components/patientDetailsFull/PatientFull/PatientFull";
import { TransferModal } from "../../../components/TransferModal/TransferModal";
import { formatTime } from "../../../utils/utils";
import "./style.scss";
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
  visit: PatientWithVisits; // можно назвать item
}
export default function Reception({ visit }: ReceptionProps) {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(
    null,
  );
  const visited = visit;
  console.log(visit, "VCVCV");
  const { patient, visits } = visit;
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}.${month}.${year}`;
  };
  console.log(patient, "ghghghg");

  const handleTransferClick = (specialityName: string) => {
    setSelectedSpeciality(specialityName);
    setIsAppointmentModalOpen(true);
  };
  return (
    <>
      <div className="bg-white rounded-xl p-6 mb-8 shadow-md border-2 border-[#46abf1] max-[500px]:p-3">
        {/* Child Header */}
        <div className="flex items-center justify-center gap-4 pb-6 mb-6 border-b-2 border-gray-100">
          <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-1 max-[500px]:text-[14px]">
              {patient.fio}
            </h3>
            <p className="text-sm text-gray-500">{patient.age} лет</p>
          </div>
          <span className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            {visits.length} {visits.length === 1 ? "запись" : "записи"}
          </span>
        </div>

        {/* Appointments List */}
        <div className="flex flex-col gap-4">
          {visits.map((visit, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 max-[500px]:p-2">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-4">
                {/* Дата и время */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                  <div className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
                    <Calendar className="w-4 h-4 text-[#46abf1] flex-shrink-0" />
                    <span>{formatDate(visit.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-gray-800 text-sm">
                    <Clock className="w-4 h-4 text-[#46abf1] flex-shrink-0" />
                    <span>{formatTime(visit.time)}</span>
                  </div>
                </div>

                {/* Врач + Специальность */}
                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <p className="font-semibold text-gray-800 text-sm">
                    Врач: {visit.resource}
                  </p>
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-[#46abf1] shrink-0" />
                    <p className="font-medium text-gray-800 text-sm">
                      {visit.speciality}
                    </p>
                  </div>
                </div>

                {/* Кнопки */}
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  <button
                    className="px-4 py-1.5 text-[#46abf1] border-2 border-[#46abf1] bg-white rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-red-600 hover:text-white hover:border-red-600 flex-1 md:flex-none min-w-[100px]"
                    onClick={() => handleTransferClick(visit.speciality)}
                  >
                    Перенести
                  </button>
                  <button className="px-4 py-1.5 bg-white text-[#edb737] border-2 border-[#edb737] rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-red-600 hover:text-white flex-1 md:flex-none min-w-[100px]">
                    Отменить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TransferModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        patient={patient}
        specialityName={selectedSpeciality}
      />
    </>
  );
}
