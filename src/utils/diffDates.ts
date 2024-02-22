const dateDiff = (date1: string, date2: string) => {
  // Exemplo de saida: 2 meses e 15 dias

  const date1Obj = new Date(date1);
  const date2Obj = new Date(date2);

  const diffTime = Math.abs(date2Obj.getTime() - date1Obj.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const months = Math.floor((diffDays % 365) / 30);

  const days = diffDays - months * 30;

  const monthString = months === 1 ? 'mês' : 'meses';
  const dayString = days === 1 ? 'dia' : 'dias';

  if (months === 0) return `${days} ${dayString}`;

  return `${months} ${monthString} e ${days} ${dayString}`;
};

export default dateDiff;
