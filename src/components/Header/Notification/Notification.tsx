import React, { useState } from 'react';
import { BellRing, X } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'appointment' | 'cancellation' | 'analysis' | 'info';
  date: string;
  isRead: boolean;
}

interface NotificationBellProps {
  onClose: () => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: 'Запись к врачу',
      message: 'Вы записаны к терапевту на 15 июня 2026 в 10:30',
      type: 'appointment',
      date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isRead: false,
    },
    {
      id: 2,
      title: 'Отмена записи',
      message: 'Запись к стоматологу на 16 июня 2026 отменена',
      type: 'cancellation',
      date: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
      isRead: false,
    },
    {
      id: 3,
      title: 'Результаты анализов',
      message: 'Готовы результаты анализов крови',
      type: 'analysis',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diff < 1) return 'только что';
    if (diff < 60) return `${diff} мин назад`;
    if (diff < 1440) return `${Math.floor(diff / 60)} ч назад`;
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const handleDelete = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <>
      {/* Оверлей */}
      <div 
        className="fixed inset-0 bg-black/20 z-[9998]"
        onClick={onClose}
      />
      
      {/* Окно уведомлений */}
      <div className="fixed right-4 top-20 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-[9999] overflow-hidden">
        {/* Заголовок */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center gap-2">
            <BellRing className="w-4 h-4 text-[#2197ed]" />
            <h3 className="font-semibold text-gray-800">Уведомления</h3>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {notifications.length > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-[#2197ed] hover:text-[#0d9488] transition-colors"
              >
                Прочитать всё
              </button>
            )}
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Список уведомлений */}
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-12 text-center">
              <BellRing className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-sm text-gray-400">Нет уведомлений</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 border-b border-gray-100 transition-colors ${
                  !notification.isRead ? 'bg-blue-50/30 hover:bg-blue-50/50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${!notification.isRead ? 'bg-[#2197ed]' : 'bg-gray-300'}`} />
                      <h4 className={`text-sm font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-500'}`}>
                        {notification.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-2">
                      {notification.message}
                    </p>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {formatDate(notification.date)}
                    </span>
                  </div>
                  
                  <div className="flex gap-1 flex-shrink-0">
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600 flex items-center justify-center transition-colors"
                        title="Отметить как прочитанное"
                      >
                        <span className="text-xs">✓</span>
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notification.id)}
                      className="w-6 h-6 rounded-full bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500 flex items-center justify-center transition-colors"
                      title="Удалить"
                    >
                      <span className="text-xs">✕</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Футер */}
        {notifications.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center">
            <button 
              onClick={onClose}
              className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </>
  );
};