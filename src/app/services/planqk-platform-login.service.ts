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

  public logoutFromPlanqkPlatform(): void {
    /* This is a (bad) workaround for the issue with logging out from PlanQK -
     * it should be changed back to keycloak.logout as soon as the Angular
     * update was performed.
     */
    this.keycloak.clearToken();
    // this.keycloak.logout();
  }
}
