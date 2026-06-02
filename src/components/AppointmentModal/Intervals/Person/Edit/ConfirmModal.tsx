import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAppSelector } from '../../../../../redux/hooks';
import { Patient } from '../../../../patientDetailsFull/PatientFull/PatientFull';
import { formatDate, formatTime } from '../../../../../utils/utils';
import axios from 'axios';

export interface Visit {
  active: number;
  branchId: number;
  branchName: string;
  busy: number;
  date: string;
  departmentId: number;
  departmentName: string;
  doctorId: number;
  doctorName: string;
  from: string;
  id: number;
  patientId: number;
  resourceId: number;
  room: string;
  specialityId: number;
  specialityName: string;
  status: number;
  to: string;
}

interface ConfirmModalProps {
  visitId: number;
  patient: Patient;
  onClose?: () => void;
}

const BUSY_MESSAGE = 'Интервал уже занят! Попробуйте записаться на другой интервал.';

export const ConfirmModal = ({ visitId, patient, onClose }: ConfirmModalProps) => {
  const user = useAppSelector((state) => state.auth.user);
  const [visit, setVisit] = useState<Visit | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [phone] = useState(user?.phone || '');
  const [fio] = useState(
    `${user?.lastName || ''} ${user?.firstName || ''} ${user?.middleName || ''}`
  );

  useEffect(() => {
    if (visitId) {
      setLoading(true);
      setMessage(null);
      setError(null);

      axios.post('/api/visit/get', { visitId })
        .then(response => {
          const data = response.data.data;
          setVisit(data);
          if (data.busy) setMessage(BUSY_MESSAGE);
        })
        .catch(error => {
          const errorMessage = error.response?.data?.message || error.message || 'Ошибка загрузки';
          setError(errorMessage);
        })
        .finally(() => setLoading(false));
    }
  }, [visitId]);

  const handleConfirm = async () => {
    if (isSuccess) return;
    
    setSubmitting(true);
    try {
      await axios.post('/api/visit/update', {
        visitId,
        patientId: patient.id,
        phone,
        fio,
        date: visit?.date,
        time: visit?.from
      });
      
      setIsSuccess(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Ошибка при подтверждении';
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const renderVisit = () => {
    if (!visit) return null;
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-gray-500">Дата и время:</span>
          <span className="font-medium text-gray-800">
            {formatDate(visit.date)} в {formatTime(visit.from)}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-gray-500">Специальность:</span>
          <span className="font-medium text-gray-800">{visit.specialityName}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-50">
          <span className="text-gray-500">Врач:</span>
          <span className="font-medium text-gray-800">{visit.doctorName}</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-gray-500">Филиал:</span>
          <span className="font-medium text-gray-800">{visit.branchName}</span>
        </div>
      </div>
    );
  };

  const renderConfirmationContent = () => {
    return (
      <>
        <div className="p-6 space-y-4">
          <div className="text-center">
            <div className="text-xl font-semibold text-green-600 mb-4">✓ Вы записаны!</div>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-500">Пациент:</span>
            <span className="font-medium text-gray-800 text-right">
              {patient.fio} <span className="text-gray-400 ml-1">(№{patient.nib})</span>
            </span>
          </div>

          <div className="space-y-2">
            <div className="text-gray-500 text-sm font-medium">Посещение:</div>
            {renderVisit()}
          </div>
        </div>
        
        <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg bg-[#2197ed] text-white font-medium hover:bg-[#1a7acc] transition-colors"
          >
            Закрыть
          </button>
        </div>
      </>
    );
  };

  const renderFormContent = () => {
    return (
      <>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-500">Пациент:</span>
            <span className="font-medium text-gray-800 text-right">
              {patient.fio} <span className="text-gray-400 ml-1">(№{patient.nib})</span>
            </span>
          </div>

          {message && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-yellow-700 text-sm">
              {message}
            </div>
          )}

          {renderVisit()}
        </div>

        <div className="flex gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            disabled={submitting}
          >
            Нет
          </button>
          <button
            onClick={handleConfirm}
            disabled={!!message || submitting}
            className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition-colors ${
              !!message || submitting
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#2197ed] hover:bg-[#1a7acc]'
            }`}
          >
            {submitting ? 'Запись...' : 'Да'}
          </button>
        </div>
      </>
    );
  };

  // Пока загружается — показываем спиннер
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative bg-white rounded-2xl p-6 shadow-xl w-full max-w-md mx-4 text-center">
          <div className="flex justify-center items-center py-8">
            <div className="w-8 h-8 border-4 border-[#2197ed] border-t-transparent rounded-full animate-spin" />
          </div>
          <p className="text-gray-600">Загрузка информации о записи...</p>
        </div>
      </div>
    );
  }

  if (error && !isSuccess) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative bg-white rounded-2xl p-6 shadow-xl w-full max-w-md mx-4 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#2197ed] text-white hover:bg-[#1a7acc] transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    );
  }

  if (!visit) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl border border-[#2197ed] shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* Заголовок */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">
            {isSuccess ? 'Подтверждение записи' : 'Подтвердить запись?'}
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Контент в зависимости от состояния */}
        {isSuccess ? renderConfirmationContent() : renderFormContent()}
      </div>
    </div>
  );
};

export default ConfirmModal;