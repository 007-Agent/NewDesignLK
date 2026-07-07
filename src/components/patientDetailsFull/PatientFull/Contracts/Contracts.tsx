import React, { useState, useEffect, useRef } from "react";
import { Usernow } from "../../../../redux/slice/authSlice";
import axios from "axios";
import Contract from "./Contract/Contract";
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

interface Contracts {
  patient: Patient;
  user: Usernow | null;
  setIsLoading: (loading: boolean) => void;
}
function Contracts({ patient, user, setIsLoading }: Contracts) {
  const [items, setItems] = useState([]);

  const isMounted = useRef(true);
  const patientId = patient.id;
  // Сброс флага монтирования при размонтировании

  // Функция загрузки данных
  const fetchVisits = () => {
    if (!patient.id) return; // ничего не делаем, если patientId не передан
    setIsLoading(true);

    axios
      .post("/api/office/patient/contracts", { patientId })
      .then((response) => {
        if (isMounted.current) {
          setItems(response.data.data);

          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setIsLoading(false);
        }
      });
  };

  // Загружаем данные при монтировании и при изменении patientId
  useEffect(() => {
    isMounted.current = true;
    fetchVisits();
    return () => {
      isMounted.current = false;
    };
  }, [patientId]);

  

  // 2. Загрузка окончена, данных нет
  // if (!items || items.length === 0) {
  //   return <div className="no-data-message">Нет доступных данных</div>;
  // }

  // 3. Данные есть – рендерим список
  const itemsElements = items.map((v, i) => <Contract key={i} contract={v} />);

  return (
    <div className="flex flex-col gap-y-2.5 max-w-[400px] mx-auto">
      {itemsElements}
    </div>
  );
}

export default Contracts;
