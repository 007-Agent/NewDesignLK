import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { loginUser } from "../../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import "../login.scss";
interface AuthorizationProps {
  onSuccess?: () => void; // закрыть модалку после успешного входа
}

export function Authorization({ onSuccess }: AuthorizationProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await dispatch(loginUser({ username, password })).unwrap();
      onSuccess?.(); // закрываем модалку
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Ошибка авторизации");
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(error);
  
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-field">
        <label htmlFor="login" className="login-label">
          Логин
        </label>
        <input
          id="login"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
          placeholder="Введите логин"
          required
          disabled={loading}
        />
      </div>
      <div className="login-field">
        <label htmlFor="password" className="login-label">
          Пароль
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          placeholder="Введите пароль"
          required
          disabled={loading}
        />
      </div>
      <button type="submit" className="login-submit" disabled={loading}>
        {loading ? "Загрузка..." : "Войти"}
      </button>
      {error && <div className="login-error">{error}</div>}
    </form>
  );
}
