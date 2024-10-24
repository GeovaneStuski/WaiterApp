import axios from 'axios';
import { APIURL } from '@env';

export const api = axios.create({
  baseURL: APIURL,
  headers: {
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3MGQ5NWFhMTUxNGQ0MGFjMTUxMjQwNiIsIm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJhZG1pbiIsInBvc2l0aW9uIjoiYWRtaW4iLCJfX3YiOjB9LCJpYXQiOjE3Mjk3MzkxNjYsImV4cCI6MTczMDM0Mzk2Nn0.4DkjO9eytgmMES3gHzatMvRiqXnT-5rnp77IxFCnKCk'
  }
});