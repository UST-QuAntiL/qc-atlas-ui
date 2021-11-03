import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class PlanqkPlatformLoginService {
  constructor(private readonly keycloak: KeycloakService) {}

  public loginToPlanqkPlatform(): void {
    this.keycloak.login();
  }

  public isLoggedIn(): Observable<boolean> {
    return from(this.keycloak.isLoggedIn());
  }

  public getBearerToken(): Observable<string> {
    return from(this.keycloak.getToken());
  }

  public getRefreshToken(): string {
    return this.keycloak.getKeycloakInstance().refreshToken;
  }

  public refreshLoginToPlanqkPlatform(): void {
    this.keycloak.updateToken(20);
  }

  public logoutFromPlanqkPlatform(): void {
    this.keycloak.logout();
  }
}

export interface AuthenticationResponse {
  accessToken: string;
  refreshToken: string;
}
