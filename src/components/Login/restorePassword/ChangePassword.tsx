//Модуль для смены пароля или его восстановления
import React, { useState, useRef } from "react";
import axios from "axios";
import Captcha from "../Captcha/Captcha";
import "../login.scss"
interface RestorePasswordProps {
  onSwitchToLogin: () => void;
}

export const ChangePassword: React.FC<RestorePasswordProps> = ({
  onSwitchToLogin,
}) => {
  const [email, setEmail] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/login/recover", {
        email,
        captcha,
      });

      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => onSwitchToLogin(), 3000);
      } else {
        setError(response.data.message || "Ошибка восстановления");
    
        setCaptcha("");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Ошибка сервера");
     
      setCaptcha("");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="restore-password">
      <h3 className="restore-title">Восстановление пароля</h3>
      <p className="restore-subtitle">
        Введите email, указанный при регистрации. Мы отправим ссылку для сброса пароля.
      </p>

      {success ? (
        <div className="restore-success">
          <p>✅ Ссылка для сброса пароля отправлена на вашу почту.</p>
          <button className="restore-back-btn" onClick={onSwitchToLogin}>
            Вернуться к авторизации
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="restore-form">
          <div className="restore-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email.(ru)"
              required
              disabled={loading}
            />
          </div>

          <div className="restore-captcha">
          
            <Captcha/>
          </div>

          <div className="restore-field">
            <label>Код с картинки</label>
            <input
              type="text"
              value={captcha}
              onChange={(e) => setCaptcha(e.target.value)}
              placeholder="Введите код"
              required
              disabled={loading}
            />
          </div>

          {error && <div className="restore-error">{error}</div>}

          <button type="submit" className="restore-submit-btn" disabled={loading}>
            {loading ? "Отправка..." : "Восстановить"}
          </button>

          <button
            type="button"
            className="restore-back-btn"
            onClick={onSwitchToLogin}
          >
            ← Назад к авторизации
          </button>
        </form>
      )}
    </div>
  );
};