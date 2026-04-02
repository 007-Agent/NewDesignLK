// import { X } from 'lucide-react';
// import { useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import './login.scss';
// import { useAppDispatch } from '../../redux/hooks';
// import { loginUser } from '../../redux/authSlice';
interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// export function LoginForm() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//       const dispatch = useAppDispatch()


//  const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//      dispatch(loginUser({ username, password }));
//      console.log(username, password)
//   };

//   return (
//     <div className="login-overlay" >
//       <div className="login-panel" onClick={(e) => e.stopPropagation()}>
//         <button className="login-close" >
//           <X />
//         </button>
        
//         <h2 className="login-title">Авторизуйтесь на портал</h2>
        
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="login-field">
//             <label htmlFor="login" className="login-label">
//               Логин
//             </label>
//             <input
//               id="login"
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               className="login-input"
//               placeholder="Введите логин"
//               required
//             />
//           </div>
          
//           <div className="login-field">
//             <label htmlFor="password" className="login-label">
//               Пароль
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="login-input"
//               placeholder="Введите пароль"
//               required
//             />
//           </div>
          
//           <button type="submit" className="login-submit">
//             Войти
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
import { X } from 'lucide-react';
import { useState } from 'react';
import './login.scss';
import { Authorization } from './Auth/Authorization';
import { Registration } from './Registration/Registartion';

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = 'auth' | 'reg';

export function LoginForm() {
  const [activeTab, setActiveTab] = useState<TabType>('auth');

 

  return (
    <div className="login-overlay" >
      <div className="login-panel" onClick={(e) => e.stopPropagation()}>
        <button className="login-close" >
          <X />
        </button>

        {/* Табы сверху */}
        <div className="login-tabs">
          <button
            className={`login-tab ${activeTab === 'auth' ? 'active' : ''}`}
            onClick={() => setActiveTab('auth')}
          >
            Авторизация
          </button>
          <button
            className={`login-tab ${activeTab === 'reg' ? 'active' : ''}`}
            onClick={() => setActiveTab('reg')}
          >
            Регистрация
          </button>
        </div>

        <div className="login-content">
          {activeTab === 'auth' ? (
            <Authorization  />
          ) : (
            <Registration onSwitchToLogin={() => setActiveTab('auth')} />
          )}
        </div>
      </div>
    </div>
  );
}