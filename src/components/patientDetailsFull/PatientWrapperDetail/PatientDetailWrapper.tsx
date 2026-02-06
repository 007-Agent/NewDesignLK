import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PatientDetailPage } from '../PatientDetail/PatientDetailPage';


export function PatientDetailPageWrapper() {
  // 1. Получаем данные из состояния навигации
  const location = useLocation();

  const { fullName } = useParams<{ fullName: string }>();
  console.log(fullName, "FULL")

  const patient = location.state?.patient 
  

 
  
  // 4. Если пациента нет в state (пользователь обновил страницу)
  if (!patient) {
    return (
      <div className="patient-not-found">
        <h3>Данные пациента не найдены</h3>
        <p>Попробуйте выбрать пациента снова</p>
       
      </div>
    );
  }
  
 return <PatientDetailPage patient={patient} fullName={fullName} />}