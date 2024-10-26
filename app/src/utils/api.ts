import axios from 'axios';
import { APIURL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

let token;

(async function getToken() {
  token = await AsyncStorage.getItem('token');
})();

export const api = axios.create({
  baseURL: APIURL,
  headers: {
    Authorization: token
  }
});