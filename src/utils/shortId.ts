/**
 * @description Create a short id
 * @returns {String} id
 */
export default function shortId(): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-';
  const charLen = chars.length;
  let generatedId = '';

  for (let i = 0; i < 10 + Math.floor(Math.random() * 10); i++){
    generatedId += chars[Math.floor(Math.random() * charLen)];
  }

  return generatedId;
}