import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 pt-12 border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Контакты */}
        <div>
          <h3 className="mb-4">Контакты</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Адрес: ул. Мира, д. 10, г. Москва</p>
            <p>Телефон: +7 (495) 123-45-67</p>
            <p>
              Email:{' '}
              <a
                href="mailto:info@medicare.ru"
                className="text-teal-600 hover:underline"
              >
                info@medicare.ru
              </a>
            </p>
          </div>
        </div>

        {/* Часы работы */}
        <div>
          <h3 className="mb-4">Часы работы</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Пн-Пт: 8:00 - 20:00</p>
            <p>Сб: 9:00 - 18:00</p>
            <p>Вс: Выходной</p>
          </div>
        </div>

        {/* Мы в соцсетях */}
        <div>
          <h3 className="mb-4">Мы в соцсетях</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-gray-700" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5 text-gray-700" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-gray-700" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
