export const formatDate = (dateStr: string): string => {
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