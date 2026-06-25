//Компонент для отображения карточки с достцуаными датами для записи
import React, { useState } from "react";
import { Usernow } from "../../../../redux/slice/authSlice";
import { Patient } from "../../../patientDetailsFull/PatientFull/PatientFull";
import Interval from "./Interval/Interval";
import { formatDateShort } from "../../../../utils/utils";
import { CardTime } from "./CardTime/CardTime";
import { X } from "lucide-react";
import { ConfirmModal } from "./Edit/ConfirmModal";

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
interface ProcessedPerson {
  branch: { id: number; name?: string };
  person: { id: number; name?: string; category?: number };
  dates: (DateItem & { intervals: TimeSlot[] })[];
}

interface PersonProps {
  user: Usernow | null;
  patient: Patient;
  person: GroupedItem;
}
export default function Person(props: PersonProps) {
  const person = props.person;
  const [showEditModal, setShowEditModal] = useState(false);

  const [visitId, setVisitId] = useState(0);
  const [index, setIndex] = useState(-1);
  const [selectedDoctor, setSelectedDoctor] = useState<Number | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const now = new Date();
  const currentTime = now.getHours() + ":" + now.getMinutes();
  console.log(props.person, "PERSON");

  const onSign = (visit: any) => {
    console.log(visit, "result visit");
    const id = visit?.id;
    console.log("onSign called, id:", id);
    setShowEditModal(true);
    if (id > 0) {
      setVisitId(id);
      console.log("visitId set to:", id);
    } else {
      setVisitId(0);
    }
    console.log(showEditModal, visitId, "gghghgh");
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const onDateClick = (index: number) => (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIndex(index);
  };

  const processedPerson = person
    ? {
        ...person,
        dates:
          person.dates?.map((date: any) => {
            // Проверяем, сегодняшняя ли это дата
            const today = new Date();
            const todayString = today.toISOString().split("T")[0];
            const isTodayDate = date.date === todayString;

            // Фильтруем интервалы только для сегодняшней даты
            const intervals = isTodayDate
              ? date.intervals?.filter((visit: any) => {
                  const now = new Date();
                  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
                  return (
                    visit.time && visit.time.substring(0, 5) >= currentTime
                  );
                }) || []
              : date.intervals || []; // Для не-сегодняшних оставляем все интервалы

            return {
              ...date,
              intervals,
            };
          }) || [],
      }
    : null;
  console.log(processedPerson, "PRCICI");

  const date = formatDateShort(person.dates[0].date);
  console.log(
    "Рендер Person, showEditModal:",
    showEditModal,
    "visitId:",
    visitId,
  );
  return (
    <>
      <div
        className={`
        flex flex-col justify-center
        p-3 px-4
        border-2 border-gray-200
        rounded-lg
        bg-white
        cursor-pointer
        transition-all duration-200
        relative
        hover:border-orange-50 hover:bg-[#f8f8f8]
        ${isExpanded ? "border-gray-200" : ""}
      `}
        onClick={handleCardClick}
      >
        {/* Крестик (только когда раскрыто) */}
        {isExpanded && (
          <X
            size={24}
            className="
            text-gray-700
            absolute right-5 top-2.5
            w-[43px] h-9
          "
          />
        )}

        {/* Информация о враче */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base mb-1 text-inherit">
            {person.person.name}
          </h3>

          {/* Доступность (скрывается, если isExpanded = true) */}
          <div
            className={`
          text-[15px] text-[#46abf1]
          ${isExpanded ? "hidden" : ""}
        `}
          >
            Записи доступны с {date}
          </div>
        </div>

        {/* Дополнительный контент при раскрытии */}
        {isExpanded && (
          <CardTime
            person={props.person}
            user={props.user}
            patient={props.patient}
            onSign={onSign}
          />
        )}

        {/* Модальное окно подтверждения */}
        {showEditModal && visitId > 0 && (
          <ConfirmModal
            visitId={visitId}
            patient={props.patient}
            onClose={() => {
              setShowEditModal(false);
              setVisitId(0);
            }}
          />
        )}
      </div>
    </>
  );
}
