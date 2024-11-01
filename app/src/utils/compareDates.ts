import { formatDistanceStrict } from 'date-fns';
import { pt } from 'date-fns/locale';

export function compareDates(date: number) {
  return formatDistanceStrict(date, new Date(), { addSuffix: true , locale: pt });
}