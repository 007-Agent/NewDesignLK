import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Usernow } from "../../../../redux/slice/authSlice";
import { Visit } from "./Visit/Visit";
import { Visited } from "./Visit/Visit";
import { Spinner } from "../../../Spinner/Spinner";

interface Patient {
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
  setIsLoading: (loading: boolean) => void;
}
export function Visits({
  patient,
  user,
  setIsLoading,
}: PatientDetailPageProps) {
  const [items, setItems] = useState<Visited[]>([]);
  console.log(items, "UTUT");
  const [message, setMes] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 20;
  const isMounted = useRef(true);

  const fetchVisits = () => {
    const patientId = patient?.id || 0;
    // console.log(patientId, 'EERRRE')
    if (patientId > 0) {
      setIsLoading(true);
      axios
        .post("/api/visit/list", { patientId })
        .then((response) => {
          if (isMounted.current) {
            // console.log(response.data.data, 'RDRDRD')
            setItems(response.data.data);
            setIsLoading(false);
            setCurrentPage(1); // при загрузке сбрасываем страницу на первую
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setIsLoading(false);
          }
        })
        .finally(() => {
          if (isMounted.current) {
            setIsLoading(false); // выключаем спиннер
          }
        });
    }
  };
  const useMessageEffect = (info: any) => {
    setMes(info);
  };

  useEffect(() => {
    isMounted.current = true;
    fetchVisits();
    return () => {
      isMounted.current = false;
    };
  }, [patient]); // при изменении patient перезагружаем визиты

  // 2. Если загрузка окончена, но данных нет – сообщение
  // if (!items || items.length === 0) {
  //   return <div className="no-data-message">Нет доступных данных</div>;
  // }

  // 3. Данные есть – рендерим список и пагинацию
  const visitItems = items
    .slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage)
    .map((v, i) => (
      <Visit
        key={i}
        patient={patient}
        visit={v}
        onRefresh={fetchVisits}
        onGetMessage={(info) => {} /* ваш колбэк */}
      />
    ));

  const totalPages = Math.ceil(items.length / clientsPerPage);
  const goToPreviousPage = () =>
    currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  const showPagination = items.length > 10;

  return (
    <div>
      {/* patient-items-list: margin-bottom 25px */}
      <div className="mb-[25px]">{visitItems}</div>

      {showPagination && (
        /* pajer_list: display flex, align-items center, justify-content center, gap 0 15px */
        <div className="flex items-center justify-center gap-x-[15px] py-4">
          <button
            className="
      cursor-pointer select-none box-border
      flex items-center justify-center
      py-[3px] px-2 max-[500px]:py-2 max-[500px]:px-4
      bg-[rgba(42,239,137,0.35)] text-black
      rounded-[8px] text-center
      font-['Arial'] text-[18px] max-[500px]:text-[14px]
      w-[220px] max-[500px]:w-full
    "
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            ← Предыдущая
          </button>

          <span className="text-center font-['Arial'] text-[18px] max-[500px]:text-[14px]">
            Страница {currentPage} из {totalPages}
          </span>

          <button
            className="
      cursor-pointer select-none box-border
      flex items-center justify-center
      py-[3px] px-2 max-[500px]:py-2 max-[500px]:px-4
      bg-[rgba(42,239,137,0.35)] text-black
      rounded-[8px] text-center
      font-['Arial'] text-[18px] max-[500px]:text-[14px]
      w-[220px] max-[500px]:w-full
    "
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Следующая →
          </button>
        </div>
      )}
    </div>
  );
}
