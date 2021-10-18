import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class PlanqkPlatformLoginService {
  constructor(private readonly keycloak: KeycloakService) {}

  public loginToPlanqkPlatform(): void {
    console.log('logging in');
    this.keycloak.login();
  }

  public isLoggedIn(): Observable<boolean> {
    console.log('check if logged in');
    return from(this.keycloak.isLoggedIn());
  }

  public getBearerToken(): Observable<string> {
    console.log('get bearer token');
    return from(this.keycloak.getToken());
  }

  public getRefreshToken(): string {
    console.log('get refresh token');
    return this.keycloak.getKeycloakInstance().refreshToken;
  }

  public refreshLoginToPlanqkPlatform(): Observable<AuthenticationResponse> {
    console.log('refreshing token');

    return from(this.keycloak.updateToken())
      .pipe(
        tap(() => {
          localStorage.setItem(
            'bearerToken',
            this.keycloak.getKeycloakInstance().token
          );
          localStorage.setItem(
            'refreshToken',
            this.keycloak.getKeycloakInstance().refreshToken
          );
          console.log(
            'set local storage: bearerToken=' +
              localStorage.getItem('bearerToken')
          );
          console.log(
            'set local storage: refreshToken=' +
              localStorage.getItem('refreshToken')
          );
        })
      )
      .pipe(
        map(() => ({
          accessToken: this.keycloak.getKeycloakInstance().token,
          refreshToken: this.keycloak.getKeycloakInstance().refreshToken,
        }))
      );
  }

  public logoutFromPlanqkPlatform(): void {
    console.log('logging out');
    this.keycloak.logout();
  }
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
}
