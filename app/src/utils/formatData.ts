export function formatDate(date: number) {
  const FormatedData = new Date(date);

  const result = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(FormatedData);

  return result;
}
