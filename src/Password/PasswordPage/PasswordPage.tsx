import { useState } from "react";
import "../../App.css";
import logotip from "../../../docs/logotip.png";
export default function PasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const mismatch = confirm.length > 0 && password !== confirm;
  const tooShort = password.length > 0 && password.length < 8;
  const canSubmit = password.length >= 8 && password === confirm;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (canSubmit) setSubmitted(true);
  }

  return (
    <div className="min-h-screen flex flex-col items-center  bg-[#f0f4f8] px-4 pt-10">
      {/* Emblem + header */}
      <div className="flex flex-col items-center mb-8 select-none">
        {/* Russian federal emblem SVG */}
        <img
          src={logotip}
          alt=""
          className="h-[72px] max-w-[1024px]:h-[60px]"
        />
        <p className="text-[11px] font-semibold tracking-[0.18em] text-[#6b7280] uppercase text-center leading-relaxed max-w-[340px]">
          Федеральное государственное бюджетное учреждение
        </p>
        <p className="text-[15px] font-bold tracking-[0.06em] text-[#1a2744] uppercase text-center leading-snug max-w-[360px] mt-1">
          Детский медицинский центр
        </p>
        <p className="text-[10.5px] font-medium tracking-[0.15em] text-[#6b7280] uppercase text-center leading-relaxed max-w-[360px] mt-1">
          Управления делами Президента Российской Федерации
        </p>
      </div>

      {/* Card */}
      <div className="bg-white w-full max-w-[400px] rounded-2xl shadow-[0_4px_32px_rgba(26,39,68,0.10)] border border-[#e5e9f0] px-8 py-8">
        {submitted ? (
          <div className="flex flex-col items-center py-6 gap-3">
            <div className="w-14 h-14 rounded-full bg-[#e6f4ea] flex items-center justify-center mb-2">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M6 14.5L11.5 20L22 9"
                  stroke="#2e7d32"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-[#1a2744] font-semibold text-base text-center">
              Пароль успешно изменён
            </p>
            <p className="text-[#6b7280] text-sm text-center">
              Используйте новый пароль для входа в систему
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <h2 className="text-[#1a2744] text-[17px] font-bold text-center mb-1 tracking-tight">
              Смена пароля
            </h2>
            <p className="text-[#6b7280] text-[12.5px] text-center mb-6 leading-relaxed">
              Введите новый пароль. Минимальная длина — 8 символов.
            </p>

            {/* Input 1 */}
            <div className="mb-4">
              <label className="block text-[12px] font-semibold text-[#374151] uppercase tracking-[0.08em] mb-1.5">
                Новый пароль
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите новый пароль"
                  className={`w-full px-4 py-3 pr-10 rounded-xl border text-[14px] text-[#1a2744] placeholder:text-[#b0b8c8] bg-[#f8fafc] outline-none transition-all duration-150
                    ${
                      tooShort
                        ? "border-[#e53935] ring-2 ring-[#e5393520]"
                        : password.length >= 8
                          ? "border-[#43a047] ring-2 ring-[#43a04720]"
                          : "border-[#d1d9e6] focus:border-[#1a2744] focus:ring-2 focus:ring-[#1a274415]"
                    }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#1a2744] transition-colors"
                  tabIndex={-1}
                  aria-label={
                    showPassword ? "Скрыть пароль" : "Показать пароль"
                  }
                >
                  {showPassword ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {tooShort && (
                <p className="mt-1.5 text-[11.5px] text-[#e53935]">
                  Пароль должен содержать не менее 8 символов
                </p>
              )}
            </div>

            {/* Input 2 */}
            <div className="mb-6">
              <label className="block text-[12px] font-semibold text-[#374151] uppercase tracking-[0.08em] mb-1.5">
                Подтверждение пароля
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Повторите пароль"
                  className={`w-full px-4 py-3 pr-10 rounded-xl border text-[14px] text-[#1a2744] placeholder:text-[#b0b8c8] bg-[#f8fafc] outline-none transition-all duration-150
                    ${
                      mismatch
                        ? "border-[#e53935] ring-2 ring-[#e5393520]"
                        : confirm.length >= 8 && !mismatch
                          ? "border-[#43a047] ring-2 ring-[#43a04720]"
                          : "border-[#d1d9e6] focus:border-[#1a2744] focus:ring-2 focus:ring-[#1a274415]"
                    }`}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#1a2744] transition-colors"
                  tabIndex={-1}
                  aria-label={showConfirm ? "Скрыть пароль" : "Показать пароль"}
                >
                  {showConfirm ? (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}    
                </button>
              </div>
              {mismatch && (
                <p className="mt-1.5 text-[11.5px] text-[#e53935]">
                  Пароли не совпадают
                </p>
              )}
            </div>

           

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full py-2.5 px-4 bg-blue-500 text-white border-none rounded-lg cursor-pointer transition-colors duration-300 mt-2 hover:bg-blue-600"
                
            >
              Сохранить новый пароль
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <p className="mt-6 text-[11px] text-[#b0b8c8] text-center tracking-wide">
        © {new Date().getFullYear()} ФГБУ «Детский медицинский центр» УД
        Президента РФ
      </p>
    </div>
  );
}
