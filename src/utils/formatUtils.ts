export function formatDate(dateStr: string): string {
  const birthdate = new Date(dateStr);
  const date = String(birthdate.getDate());
  const month = String(birthdate.getMonth() + 1);
  const year = String(birthdate.getFullYear());
  return `${date}.${month.length === 2 ? month : `0${month}`}.${year}`;
}

export function formatString(text) {
  return text.replace(/^\[\d+\]\s*/, ''); // Убираем часть до "] "
}

export function formatNumber(num: number): string {
  return num.toLocaleString('ru-RU');
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/^(\+7)(\d{3})(\d{3})(\d{2})(\d{2})$/, '$1 $2 $3 $4 $5');
}
