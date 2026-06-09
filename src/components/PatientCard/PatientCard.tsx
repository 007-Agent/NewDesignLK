import { User, Calendar, FileText } from "lucide-react";
import { PatientFull } from "../patientDetailsFull/PatientFull/PatientFull";
import { useNavigate } from "react-router-dom";
import "./patientcard.scss";
import { Usernow } from "../../redux/slice/authSlice";
import { formatDate } from "../../utils/utils";
import { calculateAge } from "../../utils/utils";
interface PatientFullData {
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
interface PatientCardProps {
  patient: PatientFullData;
  user: Usernow | null; // если нужен – убедись, что User импортирован или объявлен
}

export function PatientCard({ patient, user }: PatientCardProps) {
  const usernow = user;
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/patientsfullinfo/${patient.fio}`, {
      state: { patient },
    });
  };

  const age = calculateAge(formatDate(patient.birthday));

  return (
    <div
      onClick={handleCardClick}
      className="
    group
    bg-white 
    rounded-2xl 
    border-l-8 border-[#2197ed]
    shadow-md 
    hover:shadow-xl 
    transition-all 
    duration-300 
    cursor-pointer
    w-[420px] 
    max-[450px]:w-[350px]
    p-5
  "
    >
      {/* Шапка: аватар + имя */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`
      w-14 h-14 rounded-full flex items-center justify-center
      ${patient.gender === "муж" ? "bg-blue-100" : "bg-pink-100"}
    `}
        >
          <User
            className={`
        w-8 h-8 
        ${patient.gender === "муж" ? "text-blue-600" : "text-pink-500"}
      `}
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 max-[450px]:text-base">
          {patient.fio.split(" ").slice(0, 2).join(" ")}, {age} лет
        </h3>
      </div>

      {/* Детали: дата рождения + номер карты */}
      <div className="flex  gap-3">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-[#2197ed]" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Дата рождения
            </p>
            <p className="text-base font-medium text-gray-700 max-[450px]:text-sm">
              {patient.birthday}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#2197ed]" />
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Номер мед. карты
            </p>
            <p className="text-base font-medium text-gray-700 max-[450px]:text-sm">
              {patient.nib}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
