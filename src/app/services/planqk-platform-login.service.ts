import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlanqkPlatformLoginService {
  authenticationUrl =
    'https://platform.planqk.de/auth/realms/planqk/protocol/openid-connect/token';

  constructor(private http: HttpClient) {}

  public loginToPlanqkPlatform(
    name: string,
    password: string
  ): Observable<AuthenticationResponse> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const urlencoded = new URLSearchParams();
    urlencoded.set('grant_type', 'password');
    urlencoded.set('client_id', 'vue-frontend');
    urlencoded.set('username', name);
    urlencoded.set('password', password);

    return this.http
      .post<AuthenticationResponse>(
        'https://platform.planqk.de/auth/realms/planqk/protocol/openid-connect/token',
        urlencoded.toString(),
        {
          headers,
        }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('bearerToken', response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);
        })
      )
      .pipe(map((response) => response));
  }

  public refreshLoginToPlanqkPlatform(): Observable<AuthenticationResponse> {
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

    const urlencoded = new URLSearchParams();
    urlencoded.set('grant_type', 'refresh_token');
    urlencoded.set('client_id', 'vue-frontend');
    urlencoded.set('refresh_token', localStorage.getItem('refreshToken'));

    return this.http
      .post<AuthenticationResponse>(
        'https://platform.planqk.de/auth/realms/planqk/protocol/openid-connect/token',
        urlencoded.toString(),
        {
          headers,
        }
      )
      .pipe(
        tap((response) => {
          localStorage.setItem('bearerToken', response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);
        })
      )
      .pipe(map((response) => response));
  }

  public logoutFromPlanqkPlatform(): void {
    localStorage.removeItem('bearerToken');
    localStorage.removeItem('refreshToken');
  }
}

export interface AuthenticationResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  'not-before-policy': number;
  session_state: string;
  scope: string;
}
