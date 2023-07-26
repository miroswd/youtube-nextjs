/**
 * @param date {String} ex: "2023-07-25T01:44:08.804Z"
 * @returns {String} há x tempo
 */
export default function formatPostDate(date: string) {
  const now = new Date().getTime();
  const pastDate = new Date(date).getTime();
  const timeDiff = now - pastDate;

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30.44 * day; // Média de dias por mês
  const year = 365.25 * day; // Média de dias por ano

  if (timeDiff < minute) {
    return `há ${Math.floor(timeDiff / 1000)} ${Math.floor(timeDiff / 1000) > 1 ? 'segundos' : 'segundo'} `;
  } else if (timeDiff < hour) {
    return `há ${Math.floor(timeDiff / minute)} ${Math.floor(timeDiff / minute) > 1 ? 'minutos' : 'minuto'}`;
  } else if (timeDiff < day) {
    return `há ${Math.floor(timeDiff / hour)} ${Math.floor(timeDiff / hour) > 1 ? 'horas' : 'hora'}`;
  } else if (timeDiff < week) {
    return `há ${Math.floor(timeDiff / day)} ${Math.floor(timeDiff / day) > 1 ? 'dias' : 'dia'}`;
  } /* 
  else if (timeDiff < month) {
    return `há ${Math.floor(timeDiff / week)} ${Math.floor(timeDiff / week) > 1 ? 'semanas' : 'semana'}`;
  } */
   else if (timeDiff < year) {
    return `há ${Math.floor(timeDiff / month)} ${Math.floor(timeDiff / month) > 1 ? 'meses' : 'mês'}`;
  } else {
    return `há ${Math.floor(timeDiff / year)} ${Math.floor(timeDiff / year) > 1 ? 'anos' : 'ano'}`;
  }
}