import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import "./timetable.css";

const MONTH_NAMES = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

const DAY_NAMES_SHORT = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

interface DateItem {
  begTime: string;
  branchId: number;
  branchName: string;
  cabId: number;
  cabName: string;
  date: string;
  endTime: string;
  persId: number;
  persName: string;
  specId: number;
  specName: string;
  tipWorkId: number;
  tipWorkName: string;
}

interface SchedulePageProps {
  dates: DateItem[]; // ← массив DATES из пропсов
}

function mondayIndex(jsDay: number) {
  return jsDay === 0 ? 6 : jsDay - 1;
}

function buildCalendarGrid(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = mondayIndex(firstDay.getDay());

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function TimeTable({ dates }: SchedulePageProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  console.log(dates, "ddd dates");
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const cells = buildCalendarGrid(year, month);

  // Если данных нет
  if (!dates || dates.length === 0) {
    return (
      <div className="sch-empty">
        <Calendar />
        <h3>Нет данных о расписании</h3>
        <p>В текущем месяце нет рабочих дней</p>
      </div>
    );
  }

  // Берем первого врача из массива (все данные относятся к нему)
  const doctor = {
    persId: dates[0].persId,
    persName: dates[0].persName,
    specName: dates[0].specName,
    branchName: dates[0].branchName,
  };

  // Формируем расписание: { "2026-06-23": "08:00–14:00", ... }
  const doctorSchedule = dates.reduce(
    (acc, item) => {
      acc[item.date] = `${item.begTime}–${item.endTime}`;
      return acc;
    },
    {} as Record<string, string>,
  );

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const isToday = (day: number) =>
    year === today.getFullYear() &&
    month === today.getMonth() &&
    day === today.getDate();

  const getDayStatus = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return doctorSchedule[dateStr] || null;
  };

  return (
    <div className="sch-page">
      <div className="sch-calendar-wrap">
        {/* Doctor card */}
        <div className="sch-doctor-card">
          <div className="sch-doctor-avatar">
            <User />
          </div>
          <div>
            <div className="sch-doctor-name">{doctor.persName}</div>
            <div className="sch-doctor-meta">
              {doctor.specName} · {doctor.branchName}
            </div>
          </div>
          <div className="sch-doctor-legend">
            <span className="sch-legend-dot sch-legend-dot--work" />
            Рабочий день
            <span className="sch-legend-dot sch-legend-dot--off" />
            Выходной
            <span className="sch-legend-dot sch-legend-dot--today" />
            Сегодня
          </div>
        </div>

        {/* Month nav */}
        <div className="sch-month-nav">
          <button className="sch-nav-btn" onClick={prevMonth}>
            <ChevronLeft />
          </button>
          <span className="sch-month-label">
            {MONTH_NAMES[month]} {year}
          </span>
          <button className="sch-nav-btn" onClick={nextMonth}>
            <ChevronRight />
          </button>
        </div>

        {/* Grid */}
        <div className="sch-grid">
          {DAY_NAMES_SHORT.map((d, i) => (
            <div
              key={d}
              className={`sch-grid-head ${i >= 5 ? "sch-grid-head--weekend" : ""}`}
            >
              {d}
            </div>
          ))}

          {cells.map((day, i) => {
            if (!day)
              return (
                <div key={`blank-${i}`} className="sch-cell sch-cell--blank" />
              );
            const hours = getDayStatus(day);
            const isOff = hours === null;
            const isTodayCell = isToday(day);
            const weekdayIdx = i % 7;
            const isWeekend = weekdayIdx >= 5;

            return (
              <div
                key={day}
                className={[
                  "sch-cell",
                  isOff ? "sch-cell--off" : "sch-cell--work",
                  isTodayCell ? "sch-cell--today" : "",
                  isWeekend && isOff ? "sch-cell--weekend-off" : "",
                ].join(" ")}
              >
                <span className="sch-cell-day">{day}</span>
                {!isOff && (
                  <span className="sch-cell-hours">
                    <Clock size={11} />
                    {hours}
                  </span>
                )}
                {isOff && <span className="sch-cell-off-label">Вых.</span>}
              </div>
            );
          })}
        </div>

        {/* Summary row */}
        <div className="sch-summary">
          {(() => {
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            let workDays = 0;
            for (let d = 1; d <= daysInMonth; d++) {
              if (getDayStatus(d) !== null) workDays++;
            }
            return (
              <>
                <span>
                  Рабочих дней в {MONTH_NAMES[month].toLowerCase()}:{" "}
                  <strong>{workDays}</strong>
                </span>
                <span>
                  Выходных: <strong>{daysInMonth - workDays}</strong>
                </span>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
