import { APIURL } from '@env';


export function getImageByPath(path: string): string{
  return `${APIURL}/uploads/${path}`;
}