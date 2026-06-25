import React from 'react'


export const formatDate = (dateStr: string): string => {
  if (!dateStr || typeof dateStr !== 'string') {
    return '';
  }
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};

/////////////////////////////////////////////////////////////////////////////////////////////

export const formatDateDot = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

 ///////////////////////////////////////////////////////////////////////////////////////////////////

  export const formatDateShort = (dateStr: string): string => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}.${month}`;
  };


// //// /////////////////////////////////////////////////////////////////////////////////////////////
export function download(url : any, filename : any) {
  let link = document.createElement('a')
  if (filename) {
    link.download = filename
  }
  link.target = '_blank'
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const calculateAge = (birthday: string): number => {
  const [day, month, year] = birthday.split('.').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/////////////////////////////////////////////////////////////////////////////////////////////

export const formatTime = (time: string): string => {
  return time.slice(0, 5);
};

/////////////////////////////////////////////////////////////////////////////////////////////


export function clone(source: any, exclude?: any) {
  let dest: any = null;
  if (typeof source === 'function') {
    dest = source
  } else if (source instanceof Array) {
    dest = source.slice()
    for (let i = 0; i < dest.length; i++) {
      dest[i] = clone(dest[i], exclude)
    }
  } else if (React.isValidElement(source)) {
    dest = source
  } else if (source instanceof Date) {
    dest = new Date(source.getTime())
  } else if (source instanceof Object) {
    dest = {}
    let keys = Object.keys(source)
    for (let i = 0; i < keys.length; i++) {
      if (exclude && exclude.indexOf(keys[i]) >= 0) {
        continue
      }
      dest[keys[i]] = clone(source[keys[i]], exclude)
    }
  } else {
    dest = source
  }
  return dest
}

/////////////////////////////////////////////////////////////////////////////////////////////

export function mondayIndex(jsDay: number): number {
  return jsDay === 0 ? 6 : jsDay - 1;
}

/////////////////////////////////////////////////////////////////////////////////////////////

export function buildCalendarGrid(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = mondayIndex(firstDay.getDay());

  const cells: (number | null)[] = [];
  
  // Пустые ячейки до первого дня месяца
  for (let i = 0; i < startOffset; i++) {
    cells.push(null);
  }
  
  // Дни месяца
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }
  
  // Пустые ячейки в конце (до полной недели)
  while (cells.length % 7 !== 0) {
    cells.push(null);
  }
  
  return cells;
}

/////////////////////////////////////////////////////////////////////////////////////////////

