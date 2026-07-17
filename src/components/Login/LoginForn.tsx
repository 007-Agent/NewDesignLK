//Модуль для авторизации и регистрации
interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

import { X } from "lucide-react";
import { useState } from "react";
import "./login.scss";
import { Authorization } from "./Auth/Authorization";
import { Registration } from "./Registration/Registartion";
import logotip from "../../../docs/logotip.png";
import { ChangePassword } from "./restorePassword/ChangePassword";

interface LoginFormProps {
  isOpen: boolean;
  onClose: () => void;
}

type TabType = "auth" | "reg" | "restore";

export function LoginForm() {
  const [activeTab, setActiveTab] = useState<TabType>("auth");
  const [consentPersonalData, setConsentPersonalData] = useState(true); // ← true
  const [consentOffer, setConsentOffer] = useState(true);

  return (
    <div className="login-overlay">
      <div className="login-panel" onClick={(e) => e.stopPropagation()}>
        {/* <button className="login-close">
          <X />
        </button> */}
        <img src={logotip} alt="" className="auth_logo" />

        {/* Табы сверху */}
        <div className="login-tabs">
          <button
            className={`login-tab ${activeTab === "auth" ? "active" : ""}`}
            onClick={() => setActiveTab("auth")}
          >
            Авторизация
          </button>
          <button
            className={`login-tab ${activeTab === "reg" ? "active" : ""}`}
            onClick={() => setActiveTab("reg")}
          >
            Регистрация
          </button>
        </div>

        <div className="login-content">
          {activeTab === "auth" && <Authorization />}
          {activeTab === "reg" && (
            <Registration onSwitchToLogin={() => setActiveTab("auth")} />
          )}
          {activeTab === "restore" && (
            <ChangePassword onSwitchToLogin={() => setActiveTab("auth")} />
          )}
        </div>

        {/* Кнопка "Восстановить пароль" под формой (только для auth) */}
        {activeTab === "auth" && (
          <div className="login-footer">
            <button
              className="restore-password-btn"
              onClick={() => setActiveTab("restore")}
            >
              Восстановить пароль
            </button>
          </div>
        )}

        {/* Чекбоксы (только для регистрации) */}
        {activeTab === "reg" && (
          <div className="login-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={consentPersonalData}
                readOnly
              />
              Подтверждаю согласие на обработку персональных данных
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={consentOffer}
                readOnly
              />
              Подтверждаю согласие с договором-офертой
            </label>
          </div>
        )}
      </div>
    </div>
  );
}