import { PatientCard } from '../components/PatientCard/PatientCard';
import { Users } from 'lucide-react';
import './patientsPage.scss'
// interface PatientsPageProps {
//   onPatientSelect: (patient: any) => void;
// }

export function PatientsPage() {
  const patients = [
    {
      fullName: 'Иванова Мария Ивановна',
      gender: 'Женский',
      dateOfBirth: '10.05.2012',
      medicalCardNumber: 'МК-2012-00456',
    },
    {
      fullName: 'Петров Александр Сергеевич',
      gender: 'Мужской',
      dateOfBirth: '22.08.2014',
      medicalCardNumber: 'МК-2014-00892',
    },
  ];

  return (
    <div>
      <div className="patients-page-header">
        <div className="patients-header-icon">
          <Users />
        </div>
        <div className="patients-header-title">
          <h2>Пациенты</h2>
          <p className="patients-header-count">Всего пациентов: {patients.length}</p>
        </div>
      </div>

      <div className="patients-grid">
        {patients.map((patient, index) => (
          <PatientCard
            key={index}
            patient={patient}
            fullName={patient.fullName}
            gender={patient.gender}
            dateOfBirth={patient.dateOfBirth}
            medicalCardNumber={patient.medicalCardNumber}
           
          />
        ))}
      </div>
    </div>
  );
}