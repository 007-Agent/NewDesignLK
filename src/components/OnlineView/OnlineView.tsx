import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

 interface Patient {
  address: string;
  age: string;
  birthday: string;         // дата рождения
  branchId: number;
  contacts: string;
  father: string;
  fatherPhone: string;
  fio: string;              // полное имя
  firstName: string;
  gender: string;            // "жен"
  genderId: number;          // 2
  id: number;
  lastName: string | null;
  mother: string;
  motherPhone: string;
  nib: string;               // номер медкарты
}

interface OnlineViewProps {

  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patient: Patient) => void;
}

export const OnlineView: React.FC<OnlineViewProps> = ({ isOpen, onClose,  onSelectPatient}) => {
const [patients, setPatients] = useState<Patient[]>([]); // ← явный тип
  const [wait, setWait] = useState(false);

  const fetchPatients = async () => {
    setWait(true);
    try {
      const response = await axios.post('/api/office/patient/list', {});
      setPatients(response.data.data);
    } catch (err) {
      console.error('Ошибка загрузки пациентов:', err);
    } finally {
      setWait(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchPatients();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg mx-4 max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Выберите пациента</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="p-4">
          {wait ? (
            <div className="flex justify-center py-8">
              <div className="spinner" /> {/* ваш спиннер */}
            </div>
          ) : patients.length === 0 ? (
            <p className="text-center text-gray-500">Нет доступных пациентов</p>
          ) : (
            <div className="space-y-3">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  onClick={() => onSelectPatient(patient)}
                  
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition"
                >
                  <h3 className="text-lg font-medium">{patient.fio}</h3>
                  
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};