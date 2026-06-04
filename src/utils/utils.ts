import React from 'react'


export const formatDate = (dateStr: string): string => {
  if (!dateStr || typeof dateStr !== 'string') {
    return '';
  }
  const [year, month, day] = dateStr.split('-');
  return `${day}.${month}.${year}`;
};
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

export const formatTime = (time: string): string => {
  return time.slice(0, 5);
};


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