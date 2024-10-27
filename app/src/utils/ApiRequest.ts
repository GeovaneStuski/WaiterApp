import axios from 'axios';
import { APIURL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ApiRequestProps = {
  method: 'get' | 'post' | 'put';
  endPoint: string;
  body?: object;
}

export async function ApiRequest({ endPoint, method, body }: ApiRequestProps) {
  const token = await AsyncStorage.getItem('token');

  const request = axios.create({
    baseURL: APIURL,
    headers: {
      Authorization: token
    }
  });

  const { data } = await request[method](endPoint, body);

  return data;
}