/**
 * @param duration 
 * @returns {String} if hours > 0 returns hh:mm:ss else mm:ss
 */
export default function formatVideoDuration (duration: number): string {
  const hours =   Math.floor(duration / 3600);
  const minutes = String(Math.floor((duration % 3600) / 60)).padStart(2, '0');
  const seconds = String(Math.floor(duration % 60)).padStart(2, '0');

  const formattedDuration = `${hours > 0 ? String(hours).padStart(2, '0') + ':' : ''}${minutes}:${seconds}`;
  return formattedDuration;
}