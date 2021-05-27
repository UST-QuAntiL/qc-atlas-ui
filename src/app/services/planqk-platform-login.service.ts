import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlanqkPlatformLoginService {
  constructor() {}

  public loginToPlanqkPlatform(
    name: string,
    password: string
  ): Promise<string[] | void> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'password');
    urlencoded.append('client_id', 'vue-frontend');
    urlencoded.append('username', name);
    urlencoded.append('password', password);

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    return fetch(
      'https://platform.planqk.de/auth/realms/planqk/protocol/openid-connect/token',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result['access_token'] && result['refresh_token']) {
          return [
            result['access_token'] as string,
            result['refresh_token'] as string,
          ];
        }
      })
      .catch((error) => console.log('error', error));
  }

  public refreshLoginToPlanqkPlatform(): Promise<string[] | void> {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('grant_type', 'refresh_token');
    urlencoded.append('client_id', 'vue-frontend');
    urlencoded.append('refresh_token', localStorage.getItem('refreshToken'));

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow',
    };

    return fetch(
      'https://platform.planqk.de/auth/realms/planqk/protocol/openid-connect/token',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result['access_token'] && result['refresh_token']) {
          return [
            result['access_token'] as string,
            result['refresh_token'] as string,
          ];
        }
      })
      .catch((error) => console.log('error', error));
  }
}
