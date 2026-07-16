import React from "react";
import { Download } from "lucide-react";
import { Patient } from "../../PatientFull";
import axios from "axios";

export interface VisitData {
  date: string;
  departmentName: string;
  hisDocType: number;
  id: number;
}

interface DocumentPtops {
  visit: VisitData;
  patient: Patient;
}
export default function Document({ visit, patient }: DocumentPtops) {
  console.log(visit, "VVV");
  const protocol = visit.id;
  const handleDownloadFile22 = async () => {
    try {
      // 1. Запрашиваем файл как Blob, чтобы иметь доступ и к бинарным данным, и к заголовкам
      const response = await axios.get(
        `/api/office/getProtocol?id=${protocol}&format=pdf`,
        {
          responseType: "blob",
        },
      );

      const contentType = response.headers["content-type"] || "";
      const blob = response.data;

      // 2. Если сервер вернул JSON – это ошибка (даже при статусе 200)
      if (contentType.includes("application/json")) {
        const text = await blob.text();
        const errorData = JSON.parse(text);
        // Пример: { message: "Документ не найден!" }
        throw new Error(errorData.message || "Документ не найден");
      }

      // 3. Если пришёл PDF – сохраняем напрямую
      if (contentType.includes("application/pdf")) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "document.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return;
      }

      // 4. Если пришёл текст – возможно, это base64-строка
      if (contentType.includes("text/plain")) {
        const base64String = await blob.text();
        // Проверяем, похоже ли на base64 (простая эвристика)
        const isBase64 = /^[A-Za-z0-9+/]+=*$/.test(base64String.trim());
        if (isBase64) {
          // Декодируем base64 в бинарные данные
          const binaryString = atob(base64String);
          const bytes = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const pdfBlob = new Blob([bytes], { type: "application/pdf" });
          const url = URL.createObjectURL(pdfBlob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "document.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          return;
        } else {
          // Не base64 – считаем ошибкой
          throw new Error(
            `Неожиданный текстовый ответ: ${base64String.substring(0, 200)}`,
          );
        }
      }

      throw new Error(`Неизвестный тип ответа: ${contentType}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6 flex items-center gap-3 sm:gap-4 w-full">
        {/* Контент */}
        <div className="flex-1 min-w-0">
          {/* Верхняя строка: Дата + Протокол */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-sm sm:text-base font-semibold text-gray-800 whitespace-nowrap">
              Дата: {visit.date}
            </p>
            {visit.hisDocType === 3 && (
              <span className="text-sm sm:text-base text-gray-500 whitespace-nowrap">
                Протокол: Медицинская документация
              </span>
            )}
            {visit.hisDocType === 2 && (
              <span className="text-sm sm:text-base text-gray-500 whitespace-nowrap">
                Протокол: Исследования
              </span>
            )}
          </div>

          {/* Нижняя строка: Врач */}
          <p className="text-sm sm:text-base text-gray-500 truncate">
            Врач: {visit.departmentName}
          </p>
        </div>

        {/* Кнопка скачивания */}
        <Download
          className="w-5 h-5 sm:w-7 sm:h-7 text-[#2197ed] cursor-pointer flex-shrink-0 hover:text-[#1a7bc4] transition-colors"
          onClick={handleDownloadFile22}
        />
      </div>
    </>
  );
}
