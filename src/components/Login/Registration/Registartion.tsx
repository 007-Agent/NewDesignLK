import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import Captcha from '../Captcha/Captcha';
// предположим, что такой экшен есть
import "../login.scss"
interface RegistrationProps {
  onSwitchToLogin?: () => void; // после успешной регистрации переключить на вход
}

export function Registration({ onSwitchToLogin }: RegistrationProps) {
  const [user, setUser] = useState({
    email: '',
    firstName: '',
    captcha: '',       // сюда будем сохранять введённый пользователем код
  });
const [password, setPassword] = useState<string>('');
const [confirm, setConfirm] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

   const updateUserField = (field: keyof typeof user, value: string) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    setLoading(true);

    try {
      console.log('Регистрация:', { user, password });
      // После успешной регистрации переключаем на форму входа
      onSwitchToLogin?.();
    } catch (err: any) {
      setError(err.message || 'Ошибка регистрации');
    } finally {
      setLoading(false);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="login-error">{error}</div>}

      <div className="login-field">
       <label htmlFor="regEmail" className="login-label">Email</label>
        <input
          id="regEmail"
          type="email"
          value={user.email}
          onChange={(e) => updateUserField('email', e.target.value)}
          className="login-input"
          placeholder="example@mail.com"
          required
          disabled={loading}
        />
      </div>

      <div className="login-field">
      <label htmlFor="regName" className="login-label">Имя</label>
        <input
          id="regName"
          type="text"
          value={user.firstName}
          onChange={(e) => updateUserField('firstName', e.target.value)}
          className="login-input"
          placeholder="Введите ваше имя"
          required
          disabled={loading}
        />
        
      </div>

      <div className="login-field">
        <label htmlFor="regPassword" className="login-label">Пароль</label>
        <input
          id="regPassword"
          type="password"
         
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          placeholder="Минимум 6 символов"
          required
          disabled={loading}
        />
      </div>

      <div className="login-field">
        <label htmlFor="regConfirmPassword" className="login-label">Подтверждение пароля</label>
        <input
          id="regConfirmPassword"
          type="password"
          
          onChange={(e) => setConfirm(e.target.value)}
          className="login-input"
          placeholder="Повторите пароль"
          required
          disabled={loading}
        />
      </div>

      <div className="login-field">
        <label htmlFor="captcha" className="login-label">Код с картинки</label>
        
          <Captcha />
       <input
      id="captcha"
      type="text"
   
      onChange={(e) => updateUserField('captcha', e.target.value)}
      className="login-input"
      placeholder="Введите код"
      required
      disabled={loading}
    />
      </div>

      <button type="submit" className="login-submit" disabled={loading}>
        {loading ? 'Загрузка...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}