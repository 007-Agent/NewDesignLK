import React, { useEffect, useState } from "react";
import { PatientCard } from "./PatientCard/PatientCard";
import { Users } from "lucide-react";
import { Usernow } from "../redux/slice/authSlice";

import axios from "axios";
import { Spinner } from "./Spinner/Spinner";

interface ProfilePatientsProps {
  user: Usernow | null;
}

export function PatientsPage({ user }: ProfilePatientsProps) {
  console.log(user);
  const [patients, setPatients] = useState([]);
  const [wait, setWait] = useState(false);

  const fetchPatients = async () => {
    setWait(true);
    try {
      const response = await axios.post("/api/office/patient/list", {});
      setPatients(response.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setWait(false);
    }
  };

  useEffect(() => {
    if (user !== null) {
      fetchPatients();
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center gap-4 font-['Inter'] mx-auto">
      {wait ? (
        <Spinner />
      ) : (
        <>
          <div className="flex items-center gap-4 mb-8 font-['Inter']">
            <div className="w-16 h-16 bg-teal-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-teal-600" />
            </div>
            <div className="patients-header-title">
              <h2 className="mb-1 text-xl">Пациенты</h2>
              <p className="text-gray-500 text-base">
                Всего пациентов: {patients.length}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center text-center mx-auto max-w-[421px] gap-6 mb-10 ">
            {patients.map((patient, index) => (
              <PatientCard key={index} user={user} patient={patient} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
