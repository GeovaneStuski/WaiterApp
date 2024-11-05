import { APIURL } from '@env';

export function getImageByPath(path: string): string{
  const APIurl = APIURL;
  
  const route = `${APIurl}/uploads/${path}`;
  
  return route;
}