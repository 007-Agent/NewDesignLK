import React, { useState, useEffect } from "react";
import { Calendar, Clock, User, MapPin, FileText } from "lucide-react";
import { RefreshCw } from "lucide-react";
import { resetAppointmentsRefresh } from "../../redux/slice/visitSlice";
import { Usernow } from "../../redux/slice/authSlice";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Spinner } from "../../components/Spinner/Spinner";
import Reception from "./Reception/Reception";
import { OnlineView } from "../../components/OnlineView/OnlineView";
import { Patient } from "../../components/patientDetailsFull/PatientFull/PatientFull";
import { AppointmentModal } from "../../components/AppointmentModal/AppointmentModal";
import { setMenuOpen } from "../../redux/slice/authSlice";
interface AppointmentsProps {
  user: Usernow | null;
}
export function AppointmentsPage(props: AppointmentsProps) {
  const [showOnlineModal, setShowOnlineModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const dispatch = useAppDispatch();
  const user = props.user;
  console.log(props.user);
  const [visits, setVisits] = useState([]);
  const [wait, setWait] = useState(false);
  const refreshFlag = useAppSelector((state) => state.visitAnswer.appointments);
  const fetchPatients = async () => {
    setWait(true); // включаем спиннер перед запросом
    try {
      const response = await axios.post("/api/office/relevance/visits", {});
      setVisits(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setWait(false); // выключаем спиннер после завершения (даже при ошибке)
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [user]);

  useEffect(() => {
    if (refreshFlag) {
      fetchPatients();
      dispatch(resetAppointmentsRefresh());
    }
  }, [refreshFlag, dispatch]);

  const handleSetPatient = () => {
    setShowOnlineModal(true);
    dispatch(setMenuOpen(false));
  };

  const handleSelectPatient = (patient: Patient) => {
    setShowOnlineModal(false);
    // setIsMobileMenuOpen(false); // закрыть сайдбар

    setSelectedPatient(patient);
    setShowAppointmentModal(true);
  };
  const result = visits.map((v, i) => <Reception visit={v} key={i} />);
  return (
    <div className="max-w-[1000px] mx-auto max-[450px]:max-w-[404px] max-[450px]:flex max-[450px]:flex-col max-[450px]:justify-center">
      {/* Header */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <div className="w-10 h-10 bg-[#2197ed] text-white rounded-lg flex items-center justify-center">
          <Calendar className="w-7 h-7" />
        </div>
        <div className="flex justify-center">
          <h2 className="text-xl font-semibold">Записи к врачу</h2>
        </div>
      </div>

      {/* Content */}
      <div>
        {wait ? (
          <Spinner />
        ) : visits.length === 0 ? (
          <div className="flex flex-col">
            <div className="text-center py-10 px-5 text-gray-500 text-2xl max-[450px]:text-base">
              На данный момент нет записей к врачу отсутствуют
            </div>
            <button
              className="px-8 py-3 bg-[#2197ed] text-white cursor-pointer rounded-lg transition-colors duration-300 shadow-sm max-w-[223px] mx-auto hover:bg-[#1a7acc]"
              onClick={handleSetPatient}
            >
              Записаться к врачу!
            </button>
          </div>
        ) : (
          result
        )}
      </div>

      {/* Phone support */}
      <p className="text-center font-['Inter'] text-lg text-black mt-4 max-[450px]:text-[17px]">
        Единый телефон поддержки +7 495 727-11-66
      </p>

      {/* Modals */}
      <OnlineView
        isOpen={showOnlineModal}
        onClose={() => setShowOnlineModal(false)}
        onSelectPatient={handleSelectPatient}
      />

      {selectedPatient && (
        <AppointmentModal
          isOpen={showAppointmentModal}
          onClose={() => setShowAppointmentModal(false)}
          patient={selectedPatient}
          onSuccess={() => {
            fetchPatients();
            setShowAppointmentModal(false);
            setSelectedPatient(null);
          }}
        />
      )}
    </div>
  );
}
