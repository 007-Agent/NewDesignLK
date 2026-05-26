import React from 'react'
import { Download } from 'lucide-react';
import { Patient } from '../../PatientFull';
import axios from 'axios';

export interface VisitData {
  date: string;
  departmentName: string;
  hisDocType: number;
  id: number;
}

interface DocumentPtops{
    visit: VisitData;
    patient: Patient;
}
export default function Document({visit, patient} : DocumentPtops) {
    console.log(visit, "VVV")
    const protocol = visit.id
const handleDownloadFile22 = async () => {
    try {
      // 1. Запрашиваем файл как Blob, чтобы иметь доступ и к бинарным данным, и к заголовкам
      const response = await axios.get(
        `/api/office/getProtocol?id=${protocol}&format=pdf`,
        {
          responseType: 'blob'
        }
      )

      const contentType = response.headers['content-type'] || ''
      const blob = response.data

      // 2. Если сервер вернул JSON – это ошибка (даже при статусе 200)
      if (contentType.includes('application/json')) {
        const text = await blob.text()
        const errorData = JSON.parse(text)
        // Пример: { message: "Документ не найден!" }
        throw new Error(errorData.message || 'Документ не найден')
      }

      // 3. Если пришёл PDF – сохраняем напрямую
      if (contentType.includes('application/pdf')) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'document.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        return
      }

      // 4. Если пришёл текст – возможно, это base64-строка
      if (contentType.includes('text/plain')) {
        const base64String = await blob.text()
        // Проверяем, похоже ли на base64 (простая эвристика)
        const isBase64 = /^[A-Za-z0-9+/]+=*$/.test(base64String.trim())
        if (isBase64) {
          // Декодируем base64 в бинарные данные
          const binaryString = atob(base64String)
          const bytes = new Uint8Array(binaryString.length)
          for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i)
          }
          const pdfBlob = new Blob([bytes], { type: 'application/pdf' })
          const url = URL.createObjectURL(pdfBlob)
          const link = document.createElement('a')
          link.href = url
          link.download = 'document.pdf'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          URL.revokeObjectURL(url)
          return
        } else {
          // Не base64 – считаем ошибкой
          throw new Error(
            `Неожиданный текстовый ответ: ${base64String.substring(0, 200)}`
          )
        }
      }

      throw new Error(`Неизвестный тип ответа: ${contentType}`)
    } catch (err) {
      console.error(err)

      
    }
  }


  return (
      <>
       <div className="bg-gray-50 rounded-lg p-6 flex justify-between items-center gap-4">

    <div className='flex gap-x-[25px]'>
      <p className=" flex text-[16px] font-semibold text-gray-800 mb-1">
        Дата: {visit.date}
      </p>
      {visit.hisDocType === 3 && (
        <div className="text-[16px] text-gray-500 mb-1">
          Протокол: Медицинская документация
        </div>
      )}
      {visit.hisDocType === 2 && (
        <div className="text-[16px] text-gray-500 mb-1">
          Протокол: Исследования
        </div>
      )}
      <p className="text-[16px] text-gray-500">
        Врач: {visit.departmentName}
      </p>
    </div>
     <Download className="w-7 h-7 text-[#2197ed] cursor-pointer "  onClick={handleDownloadFile22}/>
  </div>
 

      
    </>
)
}
