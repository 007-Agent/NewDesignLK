import React, { useEffect } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onConfirm: () => void;
  // title?: string;
  // message?: string;
  // confirmText?: string;
  // cancelText?: string;
}

export function ConfirmWindow({isOpen, onClose} : ConfirmModalProps) {
  // if (!isOpen) return null;

  // const handleConfirm = () => {
  //   onConfirm();
  //   onClose();
  // };
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    // Затемнённый фон
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      {/* Модальное окно (клик внутри не закрывает) */}
      <div
        className="bg-white rounded-2xl p-6 max-w-[400px] w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Заголовок */}
        <h2 className="text-xl font-bold text-gray-800 text-center mb-3">
          Подтверждение
        </h2>

        {/* Текст сообщения */}
        <p className="text-gray-600 text-center text-base leading-relaxed mb-6">
          Вы точно хотите перенести запись? Существующая запись будет удалена 
        </p>

        {/* Кнопки */}
        <div className="flex gap-3 justify-center">
          <button
            className="
              px-6 py-2.5
              bg-orange-500 hover:bg-orange-600
              text-white font-semibold
              rounded-lg
              transition-all duration-200
              hover:scale-105
              shadow-md
              min-w-[100px]
            "
          >
            Да
          </button>
          <button
            className="
              px-6 py-2.5
              bg-gray-200 hover:bg-gray-300
              text-gray-700 font-semibold
              rounded-lg
              transition-all duration-200
              hover:scale-105
              min-w-[100px]
            "
            onClick={onClose}
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
}
