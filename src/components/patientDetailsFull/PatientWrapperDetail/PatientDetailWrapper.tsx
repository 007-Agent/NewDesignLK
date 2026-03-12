import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PatientFull } from '../PatientFull/PatientFull';
import { Usernow } from '../../../redux/authSlice';
interface Wrapper {
  user: Usernow | null;
}
export function PatientDetailPageWrapper({user} : Wrapper) {
  // 1. Получаем данные из состояния навигации
  const location = useLocation();

  const { fullName } = useParams<{ fullName: string }>();
  console.log(fullName, "FULL")

  const patient = location.state?.patient 
  console.log(patient, "PERERE")

 
  
  // 4. Если пациента нет в state (пользователь обновил страницу)
  if (!patient) {
    return (
      <div className="patient-not-found">
        <h3>Данные пациента не найдены</h3>
        <p>Попробуйте выбрать пациента снова</p>
       
      </div>
    );
  }
  
 return <PatientFull patient={patient} user={user} />}