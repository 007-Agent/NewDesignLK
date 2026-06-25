//Компнент для осуществления записи к врачу
import { useState, useEffect, useRef } from "react";
import { X, Calendar as CalendarIcon } from "lucide-react";
import { RefreshCw } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./appointment.scss";
import { useAppSelector } from "../../redux/hooks";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Patient } from "../patientDetailsFull/PatientFull/PatientFull";
import { CustomSelectModal } from "../..//components/CustomSelect/CustomSelect";
import Intervals from "./Intervals/Intervals";
import { createPortal } from "react-dom";
interface IntervalItem {
  date: string;
  time: string;
  visitId: number; // или string, смотря что приходит
  person: { category: number; id: number; name?: string };
  branch: { id: number; name?: string };
}

interface RefactoredDateItem {
  date: string;
  intervals: { time: string; id: number }[];
}
registerLocale("ru", ru);
interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
  onSuccess?: () => void;
}
interface RefactoredItem {
  branch: { id: number; name?: string };
  person: { id: number; name?: string };
  dates: RefactoredDateItem[];
}

const refactorIntervals = (intervals: IntervalItem[]): RefactoredItem[] => {
  if (!intervals || !Array.isArray(intervals)) return [];

  return intervals.reduce<RefactoredItem[]>((acc, cur) => {
    const { date, time, visitId, person, branch } = cur;
    const foundItem = acc.find(
      (v) => v.branch.id === branch.id && v.person.id === person.id,
    );
    const item = foundItem || { branch, person, dates: [] };
    const foundDateItem = item.dates.find((v) => v.date === date);
    const dateItem = foundDateItem || { date, intervals: [] };
    const foundInterval = dateItem.intervals.find((v) => v.id === visitId);
    if (!foundInterval) dateItem.intervals.push({ time, id: visitId });
    if (!foundDateItem) item.dates.push(dateItem);
    if (!foundItem) acc.push(item);
    return acc;
  }, []);
};

export function AppointmentModal({
  isOpen,
  onClose,
  patient,
}: AppointmentModalProps) {
  console.log(patient, "show modal pat");
  const [wait, setWait] = useState(false);
  const [specId, setSpecId] = useState<number | undefined>();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [intervals, setIntervals] = useState<RefactoredItem[]>([]);
  const [fromDate, setFromDate] = useState(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  });
  const [loading, setLoading] = useState(false);
  const [dateTo, setDateTo] = useState(() => {
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
    twoWeeksLater.setHours(0, 0, 0, 0);
    return twoWeeksLater;
  });
  const { items } = useAppSelector((state) => state.specialities);
  const { user, checkStatus } = useAppSelector((state) => state.auth);
  const branchId = patient.branchId;

  // Блокировка скролла body при открытии модального окна
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    // получаем интервалы записей
    const fetchIntervals = async () => {
      // Проверяем условия для запроса
      if (!(specId && specId > 0 && fromDate.getTime() <= dateTo.getTime())) {
        return;
      }

      try {
        // Вычисляем границы дат
        const bound = new Date();
        bound.setDate(bound.getDate() + 1);
        const leftBound = new Date(bound);
        bound.setDate(bound.getDate() + 12);
        const rightBound = new Date(bound);

        const requestFromDate = fromDate < leftBound ? leftBound : fromDate;
        const requestToDate = dateTo > rightBound ? rightBound : dateTo;

        // Включаем спиннер (загрузку)
        setLoading(true);
        setWait(true);

        // Выполняем запрос
        const response = await axios.post("/api/sched/intervals", {
          specId,
          fromDate: formatDateToISO(requestFromDate),
          toDate: formatDateToISO(requestToDate),
          branchId,
        });

        // Обрабатываем успешный ответ
        setIntervals(refactorIntervals(response.data.data));
      } catch (error) {
        // Обрабатываем ошибку
        console.error("Ошибка при получении интервалов:", error);
      } finally {
        setWait(false);
      }
    };

    fetchIntervals();
  }, [fromDate, dateTo, specId]);

  const formatDateToISO = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getAvailableDates = () => {
    if (!fromDate || !dateTo) return [];

    const dates = [];
    const start = new Date(fromDate);
    const end = new Date(dateTo);

    while (start <= end) {
      dates.push(new Date(start).toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }

    return dates;
  };

  // Генерируем временные слоты
  const getTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        slots.push(time);
      }
    }
    return slots;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      weekday: "short",
    };
    return date.toLocaleDateString("ru-RU", options);
  };

  if (!isOpen) return null;
  const availableDates = getAvailableDates();
  const timeSlots = getTimeSlots();
  return createPortal(
    <div className="appointment-modal-overlay" onClick={onClose}>
      <div className="appointment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="appointment-modal-header">
          <h2>Записаться к врачу</h2>
          <button className="appointment-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="appointment-modal-content">
          {/* Диапазон дат с календарём */}
          <div className="appointment-date-range">
            <div className="appointment-input-group">
              <label>С какого числа</label>
              <div className="appointment-date-picker-wrapper">
                <CalendarIcon size={18} className="calendar-icon" />
                <DatePicker
                  popperPlacement="bottom-start"
                  selected={fromDate}
                  onChange={(date: any) => {
                    setFromDate(date);
                    setSelectedDate("");
                  }}
                  minDate={new Date()}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Выберите дату"
                  locale="ru"
                  className="appointment-date-input"
                />
              </div>
            </div>
            <div className="appointment-input-group">
              <label>По какое число</label>
              <div className="appointment-date-picker-wrapper">
                <CalendarIcon size={18} className="calendar-icon" />
                <DatePicker
                  popperPlacement="bottom-start"
                  selected={dateTo}
                  onChange={(date: any) => {
                    setDateTo(date);
                    setSelectedDate("");
                  }}
                  minDate={fromDate || new Date()}
                  dateFormat="dd.MM.yyyy"
                  placeholderText="Выберите дату"
                  locale="ru"
                  className="appointment-date-input"
                />
              </div>
            </div>
          </div>

          {/* Выбор специальности */}
          <div className="appointment-input-group specialty-group">
            <CustomSelectModal
              options={items}
              value={specId}
              onChange={(id) => setSpecId(id)}
              placeholder="Выберите специальность"
            />
          </div>
        </div>
        {wait ? (
          // Показываем спиннер по центру, пока идёт загрузка
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <RefreshCw className="spinner" />
          </div>
        ) : (
          <>
            <Intervals intervals={intervals} user={user} patient={patient} />
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
