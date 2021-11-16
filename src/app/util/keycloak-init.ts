import { KeycloakService } from 'keycloak-angular';

export const initializeKeycloak = (keycloak: KeycloakService) => (): Promise<
  boolean
> =>
  keycloak
    .init({
      config: {
        url: 'https://platform.planqk.de/auth',
        realm: 'planqk',
        clientId: 'vue-frontend',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
      enableBearerInterceptor: false,
    })
    .then((retValue) => retValue);
