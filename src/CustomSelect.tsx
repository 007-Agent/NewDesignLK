import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import './custom.scss';

interface Option {
  id: number;
  name: string;
}

interface CustomSelectModalProps {
  options: Option[];
  value: number | undefined;
  onChange: (id: number | undefined) => void;
  placeholder?: string;
  label?: string;
}

export function CustomSelectModal({
  options,
  value,
  onChange,
  placeholder = 'Выберите специальность',
  label,
}: CustomSelectModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.id === value);


  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Блокировка скролла при открытом окне
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelect = (id: number) => {
    onChange(id);
    setIsOpen(false);
  };

  

//   return (
//     <div className="custom-select-modal-container">
//       {label && <label className="custom-select-modal-label">{label}</label>}
//       <div
//         ref={triggerRef}
//         className="custom-select-modal-trigger"
//         onClick={() => setIsOpen(true)}
//       >
//         {selectedOption ? selectedOption.name : placeholder}
//         <span className="custom-select-modal-arrow">{isOpen ? '▲' : '▼'}</span>
//       </div>

//       {isOpen &&
//         createPortal(
//           <div className="custom-select-modal-overlay" onClick={() => setIsOpen(false)}>
//             <div
//               className="custom-select-modal-window"
//               onClick={(e) => e.stopPropagation()}
//               // можно позиционировать относительно триггера, но для простоты — по центру
//             >
//               <div className="custom-select-modal-header">
//                 <span>{label || 'Выберите специальность'}</span>
//                 <button className="custom-select-modal-close" onClick={() => setIsOpen(false)}>
//                   ✕
//                 </button>
//               </div>
//               <div className="custom-select-modal-list">
//                 {options.map((option) => (
//                   <div
//                     key={option.id}
//                     className={`custom-select-modal-item ${value === option.id ? 'selected' : ''}`}
//                     onClick={() => handleSelect(option.id)}
//                   >
//                     {option.name}
//                   </div>
//                 ))}
               
//               </div>
//             </div>
//           </div>,
//           document.body
//         )}
//     </div>
//   );
// }
  return (
    <div className="w-full font-['Inter']">
      {label && (
        <label className="block mb-2 text-gray-700 font-medium font-['Inter']">
          {label}
        </label>
      )}
      <div
        ref={triggerRef}
        className="flex justify-between items-center p-[10px_14px] border-2 border-gray-200 rounded-lg bg-white cursor-pointer transition-all hover:border-orange-500 hover:bg-orange-50 text-lg font-['Inter']"
        onClick={() => setIsOpen(true)}
      >
        {selectedOption ? selectedOption.name : placeholder}
        <span className="text-xs text-gray-500">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-white rounded-2xl w-[90%] max-w-[400px] max-h-[80vh] overflow-y-auto shadow-xl animate-[slideUp_0.3s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200 font-semibold text-orange-500">
                <span>{label || 'Выберите специальность'}</span>
                <button
                  className="bg-transparent border-none cursor-pointer text-2xl text-gray-500 p-1 leading-none hover:text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="py-2 flex flex-col items-center text-center">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className={`
                      w-full py-3 px-5 cursor-pointer transition-colors border-b border-black text-xl
                      hover:bg-gray-100
                      max-[450px]:py-2 max-[450px]:px-6 max-[450px]:text-base
                      ${value === option.id ? 'bg-orange-50 text-orange-500 font-medium' : ''}
                    `}
                    onClick={() => handleSelect(option.id)}
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};