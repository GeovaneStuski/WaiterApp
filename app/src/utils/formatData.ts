export function formatData(date: number) {
  const Dated = new Date(date);
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(Dated);

  return formattedDate;
}
