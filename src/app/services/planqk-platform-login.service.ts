import { Injectable } from '@angular/core';
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

  public refreshLoginToPlanqkPlatform(): void {
    console.log('refreshing token');
    this.keycloak.updateToken(20);
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
