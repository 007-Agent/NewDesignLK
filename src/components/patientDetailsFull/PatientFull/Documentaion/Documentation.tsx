// export default Techniques
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Document from "./Document/Document";
import { Usernow } from "../../../../redux/slice/authSlice";

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

interface DocumentationProps {
  patient: Patient;
  user: Usernow | null;
  setIsLoading: (loading: boolean) => void;
}

const Documentation = ({ patient, user, setIsLoading }: DocumentationProps) => {
  const [items, setItems] = useState([]);
  // console.log(items, 'UTUT')
  const [message, setMes] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 25;
  const isMounted = useRef(true);
  // console.log(patient, 'BBBVBVB')
  const fetchVisits = () => {
    const patientId = patient?.id || 0;
    console.log(patientId, "EERRRE");
    if (patientId > 0) {
      setIsLoading(true);
      axios
        .post("/api/visit/protocol-list", { patientId })
        .then((response) => {
          if (isMounted.current) {
            console.log(response.data.data, "RDRDRD");
            setItems(response.data.data);

            setIsLoading(false);
            setCurrentPage(1); // при загрузке сбрасываем страницу на первую
          }
        })
        .catch(() => {
          if (isMounted.current) {
            setIsLoading(false);
          }
        });
    }
  };
  //   const useMessageEffect = info => {
  //     // console.log(info, 'TRUEOR')
  //     setMes(info)
  //   }
  useEffect(() => {
    if (patient?.id) {
      fetchVisits();
    }
  }, [patient]);

  useEffect(() => {
    isMounted.current = true;
    fetchVisits();
    return () => {
      isMounted.current = false;
    };
  }, [patient]); // при изменении patient перезагружаем визиты

  const visitItems = items
    .slice((currentPage - 1) * clientsPerPage, currentPage * clientsPerPage)
    .map((v, i) => (
      <Document
        key={i}
        patient={patient}
        visit={v}
        // onRefresh={fetchVisits}
        // onGetMessage={useMessageEffect}
      />
    ));

  const totalPages = Math.ceil(items.length / clientsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className="p-5 flex justify-center">
          Нет существующих протоколов
        </div>
      ) : (
        <>
          {items.length > 0 && (
            <>
              <div className="flex flex-col gap-4">{visitItems}</div>
              <div>
                <button onClick={goToPreviousPage} disabled={currentPage === 1}>
                  ← Предыдущая
                </button>
                <span>
                  Страница {currentPage} из {totalPages}
                </span>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages || totalPages === 0}
                >
                  Следующая →
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Documentation;
