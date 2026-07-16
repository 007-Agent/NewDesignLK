//Отображения мед карты выбранно пациента
import { useState } from "react";
import {
  User,
  ArrowLeft,
  FileText,
  Syringe,
  Activity,
  Eye,
  HeartPulse,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Medicaments from "./Medicaments/Medicaments";
import "./Patientfull.scss";
import { Visits } from "./Visits/Visits";
import { Usernow } from "../../../redux/slice/authSlice";
import Contracts from "./Contracts/Contracts";
import Vaccinations from "./Vacination/Vacinations";
import { AppointmentModal } from "../../AppointmentModal/AppointmentModal";
import Analyzes from "./Analyzes/Analyzes";
import Observations from "./Observations/Observations";
import Disables from "./Disables/Disables";
import Documentation from "./Documentaion/Documentation";
import { formatDate } from "../../../utils/utils";
import { Spinner } from "../../Spinner/Spinner";

export interface Patient {
  address: string;
  age: string;
  birthday: string; // дата рождения
  branchId: number;
  contacts: string;
  father: string;
  fatherPhone: string;
  fio: string; // полное имя
  firstName: string;
  gender: string; // "жен"
  genderId: number; // 2
  id: number;
  lastName: string | null;
  mother: string;
  motherPhone: string;
  nib: string; // номер медкарты
}

interface PatientDetailPageProps {
  patient: Patient;
  user: Usernow | null;
}

export function PatientFull({ patient, user }: PatientDetailPageProps) {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    { id: "contracts", label: "Договоры", icon: FileText },
    { id: "sickLeave", label: "Больничные листы", icon: FileText },
    { id: "vaccination", label: "Вакцинация", icon: Syringe },
    { id: "terrapy", label: "Антибактериальная терапия", icon: Syringe },
    { id: "laboratory", label: "Лабораторные исследования", icon: Activity },
    { id: "monitoring", label: "Активное наблюдение", icon: Eye },
    { id: "examination", label: "Диспансеризация", icon: HeartPulse },
    { id: "visits", label: "Приёмы и услуги", icon: Calendar },
    { id: "documentation", label: "Медицинская документация", icon: Syringe },
  ];

  const examinations = [
    { year: "2023", date: "15.05.2023", status: "Пройдена", result: "Здоров" },
    { year: "2024", date: "-", status: "Запланирована", result: "-" },
  ];
  const handleTabClick = (tabId: string) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  const onBack = () => {
    navigate("/patients");
  };
  return (
    <>
      <div className="max-w-[1020px] mx-auto block max-[1025px]:px-[10px] w-full overflow-x-hidden">
        {/* Back Button */}
        <button onClick={onBack} className="patient-detail-back">
          <ArrowLeft />
          Назад к списку пациентов
        </button>

        {/* Patient Header */}
        <div className="patient-detail-header">
          <div className="patient-detail-header-content">
            <div
              className={`patient-detail-avatar ${patient.gender === "Мужской" ? "male" : "female"}`}
            >
              <User
                className={patient.gender === "Мужской" ? "male" : "female"}
              />
            </div>
            <div className="patient-detail-info">
              <h2>{patient.fio}</h2>
              <div className="patient-detail-meta">
                <span>Пол: {patient.gender}</span>
                <span>Дата рождения: {formatDate(patient.birthday)}</span>
                <span>Мед. карта: {patient.nib}</span>
              </div>
            </div>
            <button
              className="header-btn-appointment"
              onClick={() => setIsAppointmentModalOpen(true)}
            >
              Записаться к врачу!
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="vertical-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon; // Теперь это компонент
            return (
              <div key={tab.id} className="tab-section">
                <div
                  className={`tab-header ${activeTab === tab.id ? "active" : "inactive"}`}
                  onClick={() => handleTabClick(tab.id)}
                >
                  <Icon size={20} /> {/* Рендерим компонент иконки */}
                  <span className="tab-label">{tab.label}</span>
                </div>
                {activeTab === tab.id && (
                  <div className="tab-content">
                    {tab.id === "contracts" && (
                      <Contracts
                        patient={patient}
                        user={user}
                        setIsLoading={setIsLoading}
                      />
                    )}
                    {tab.id === "sickLeave" && (
                      <Disables
                        patient={patient}
                        user={user}
                        setIsLoading={setIsLoading}
                      />
                    )}
                    {tab.id === "vaccination" && (
                      <Vaccinations
                        patient={patient}
                        user={user}
                        setIsLoading={setIsLoading}
                      />
                    )}
                    {tab.id === "terrapy" && (
                      <Medicaments
                        patient={patient}
                        user={user}
                        setIsLoading={setIsLoading}
                      />
                    )}
                    {tab.id === "laboratory" && (
                      <Analyzes
                        patient={patient}
                        user={user}
                        setIsLoading={setIsLoading}
                      />
                    )}
                    {tab.id === "monitoring" && (
                      <Observations
                        patient={patient}
                        user={user}
                        setIsLoading={setIsLoading}
                      />
                    )}
                    {tab.id === "examination" && (
                      <div className="examination-list">
                        <h3>Диспансеризация</h3>
                        {examinations.map((exam, index) => (
                          <div key={index} className="examination-item">
                            <div className="examination-header">
                              <div>
                                <p className="examination-title">
                                  Диспансеризация {exam.year}
                                </p>
                                <p className="examination-date">
                                  {exam.date !== "-"
                                    ? `Дата: ${exam.date}`
                                    : "Дата не назначена"}
                                </p>
                              </div>
                              <span
                                className={`status-badge ${exam.status === "Пройдена" ? "completed" : "pending"}`}
                              >
                                {exam.status}
                              </span>
                            </div>
                            <p className="examination-result">
                              Результат: {exam.result}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {tab.id === "visits" && (
                      <Visits
                        patient={patient}
                        user={user}
                        setIsLoading={setIsLoading}
                      />
                    )}
                    {tab.id === "documentation" && (
                      <Documentation
                        patient={patient}
                        user={user}
                        setIsLoading={setIsLoading}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center  z-10">
            <Spinner />
          </div>
        )}
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          patient={patient}
        />
      </div>
    </>
  );
}
