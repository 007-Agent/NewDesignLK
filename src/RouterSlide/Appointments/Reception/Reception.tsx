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
        <div className="flex flex-col gap-6">
          {visits.map((visit, i) => (
            <div key={i} className="bg-gray-50 rounded-xl max-[500px]py-3">
              <div className="flex items-center justify-between gap-4 mb-2 px-3">
                {/* Дата и время - строка 1 на мобилках */}
                <div className="flex gap-6 max-[500px]:justify-between max-[500px]:max-w-[261px] w-[265px]">
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <Calendar className="w-5 h-5 text-[#edb737]" />
                    <span>{formatDate(visit.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 font-semibold text-gray-800">
                    <Clock className="w-5 h-5 text-[#edb737]" />
                    <span>{formatTime(visit.time)}</span>
                  </div>
                </div>

                {/* Врач + Специальность - строка 2 на мобилках */}
                <div className="flex flex-col max-[500px]:flex-row max-[500px]:justify-between max-[500px]:gap-4 gap-1 col-span-1 md:col-span-2">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-800 text-[15px] max-[500px]:text-[14px]">
                      Врач: {visit.resource}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#edb737] shrink-0" />
                    <p className="font-medium text-gray-800 text-[15px] max-[500px]:text-[14px]">
                      {visit.speciality}
                    </p>
                  </div>
                </div>

                {/* Кнопка - строка 3 на мобилках */}
                <div className="flex gap-3 max-[500px]:justify-end max-w-[260px]">
                  <button
                    className="px-6 py-1.5 h-[35px] text-[#edb737] border-2 border-[#edb737] bg-white rounded-lg text-[14px] font-semibold cursor-pointer transition-all duration-200 hover:bg-red-600 hover:text-white hover:border-red-600 max-[500px]:w-full max-[500px]:px-4"
                    onClick={() => handleTransferClick(visit.speciality)}
                  >
                    Перенести
                  </button>
                  <button className="px-6 py-1.5 h-[35px] bg-white text-red-600 border border-red-600 rounded-lg text-[14px] font-semibold cursor-pointer transition-all duration-200 hover:bg-red-600 hover:text-white max-[500px]:w-full max-[500px]:px-4">
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
