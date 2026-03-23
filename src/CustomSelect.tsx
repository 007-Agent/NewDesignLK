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

  

  return (
    <div className="custom-select-modal-container">
      {label && <label className="custom-select-modal-label">{label}</label>}
      <div
        ref={triggerRef}
        className="custom-select-modal-trigger"
        onClick={() => setIsOpen(true)}
      >
        {selectedOption ? selectedOption.name : placeholder}
        <span className="custom-select-modal-arrow">{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen &&
        createPortal(
          <div className="custom-select-modal-overlay" onClick={() => setIsOpen(false)}>
            <div
              className="custom-select-modal-window"
              onClick={(e) => e.stopPropagation()}
              // можно позиционировать относительно триггера, но для простоты — по центру
            >
              <div className="custom-select-modal-header">
                <span>{label || 'Выберите специальность'}</span>
                <button className="custom-select-modal-close" onClick={() => setIsOpen(false)}>
                  ✕
                </button>
              </div>
              <div className="custom-select-modal-list">
                {options.map((option) => (
                  <div
                    key={option.id}
                    className={`custom-select-modal-item ${value === option.id ? 'selected' : ''}`}
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
}