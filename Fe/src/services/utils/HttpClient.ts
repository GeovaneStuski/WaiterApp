import { toast } from 'react-toastify';
import ApiError from '../../Errors/ApiError';
import ConflictData from '../../Errors/ConflictData';
import WrongDataError from '../../Errors/WrongDataError';
import { delay } from '../../utils/delay';

type MethodsOptions<T> = {
  body?: T;
  headers?: Headers;
};

type Headers = {
  [key in string]: string | number | boolean;
};

type RequestOptions<T> = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: T | FormData;
  headers?: Headers;
};

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get<T>(path: string, options?: MethodsOptions<T>) {
    const response = this.makeRequest(path, {
      method: 'GET',
      headers: options?.headers,
    });

    return response;
  }

  post<T>(path: string, options: MethodsOptions<T>) {
    const response = this.makeRequest<T>(path, {
      method: 'POST',
      body: options.body,
      headers: options.headers,
    });

    return response;
  }

  put<T>(path: string, options: MethodsOptions<T>) {
    const response = this.makeRequest<T>(path, {
      method: 'PUT',
      body: options.body,
      headers: options.headers,
    });

    return response;
  }

  patch<T>(path: string, options: MethodsOptions<T>) {
    const response = this.makeRequest<T>(path, {
      method: 'PATCH',
      body: options.body,
      headers: options.headers,
    });

    return response;
  }

  delete<T>(path: string, options?: MethodsOptions<T>) {
    const response = this.makeRequest(path, {
      method: 'DELETE',
      headers: options?.headers,
    });

    return response;
  }

  private async makeRequest<T>(path: string, options: RequestOptions<T>) {
    const headers = new Headers();

    if (path !== '/login') {
      headers.append('authorization', localStorage.getItem('token') as string);
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value.toString());
      });
    }

    if (
      options.body &&
      typeof options.body === 'object' &&
      'image' in options.body &&
      typeof options.body.image !== 'string'
    ) {
      const form = new FormData();

      Object.entries(options.body).forEach(([name, value]) => {
        form.append(name, value);
      });

      options.body = form;
    } else {
      headers.append('Content-Type', 'application/json');
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      method: options.method,
      body: options.body instanceof FormData ? options.body : JSON.stringify(options.body),
      headers,
    });

    await delay(500);

    let body;

    if(response.status === 204) {
      return;
    }

    if (response.body) {
      body = await response.json();
    }

    if (response.status === 200 || response.status === 201) {
      return body;
    }

    if (response.status === 400) {
      throw new WrongDataError(response, body);
    }

    if (response.status === 401) {
      localStorage.removeItem('token');

      const event = new Event('storage');

      toast.error('Token de acesso expirado');
      window.dispatchEvent(event);

      return;
    }

    if(response.status === 409) {
      throw new ConflictData(response, body);
    }

    if (response.status >= 500) {
      throw new ApiError(response, body);
    }
  }
}
