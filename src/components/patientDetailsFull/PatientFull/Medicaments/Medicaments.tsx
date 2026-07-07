import React, { useState, useEffect, useRef } from "react";

import { Usernow } from "../../../../redux/slice/authSlice";
import { Patient } from "../PatientFull";
import Medicament from "./Medocament/Medicament";
import { Spinner } from "../../../Spinner/Spinner";
import axios from "axios";
interface MedicamentsProps {
  patient: Patient;
  user: Usernow | null;
  setIsLoading: (loading: boolean) => void;
}
export default function Medicaments({
  patient,
  user,
  setIsLoading,
}: MedicamentsProps) {
  const [items, setItems] = useState([]);

  const isMounted = useRef(true);
  const patientId = patient.id;

  const fetchMedicaments = () => {
    if (!patient.id) return; // ничего не делаем, если patientId не передан

    setIsLoading(true);
    axios
      .post("/api/office/patient/medicaments", { patientId })
      .then((response) => {
        if (isMounted.current) {
          // console.log(response.data.data, 'RDRDRD')
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
    fetchMedicaments();
    return () => {
      isMounted.current = false;
    };
  }, [patientId]);
  console.log(items, "TT");

  const itemsMedicaments = items.map((v, i) => (
    <Medicament key={i} medicament={v} />
  ));
  return <div>{itemsMedicaments}</div>;
}
