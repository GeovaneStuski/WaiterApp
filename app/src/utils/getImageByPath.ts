import { APIURL } from '@env';

export function getImageByPath(path: string): string{
  const route = `${APIURL}/uploads/${path}`;
  
  return route;
}