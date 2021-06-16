import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { PlanqkPlatformLoginService } from '../services/planqk-platform-login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  private rootUrl = location.origin;
  private bearerTokenSubject: BehaviorSubject<string> = new BehaviorSubject<
    string
  >(null);

  constructor(private planqkPlatformLoginService: PlanqkPlatformLoginService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.toString().includes('qc-catalog')) {
      return next
        .handle(this.addBearerToken(req, localStorage.getItem('bearerToken')))
        .pipe(
          catchError((err) => {
            if (
              err instanceof HttpErrorResponse &&
              err.status === 401 &&
              localStorage.getItem('bearerToken') &&
              localStorage.getItem('refreshToken')
            ) {
              return this.refreshBearerToken(req, next).pipe(
                catchError((error) => {
                  this.planqkPlatformLoginService.logoutFromPlanqkPlatform();
                  window.location.replace(this.rootUrl);
                  return throwError(
                    'Request to PlanQK Platform failed!',
                    error
                  );
                })
              );
            } else {
              this.planqkPlatformLoginService.logoutFromPlanqkPlatform();
              window.location.replace(this.rootUrl);
              return throwError('Request to PlanQK Platform failed!', err);
            }
          })
        );
    }
    return next.handle(req);
  }

  addBearerToken(
    request: HttpRequest<any>,
    bearerToken: string
  ): HttpRequest<any> {
    if (bearerToken) {
      return request.clone({
        setHeaders: { Authorization: 'Bearer ' + bearerToken },
      });
    }
    return request;
  }

  refreshBearerToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.refreshTokenInProgress) {
      this.refreshTokenInProgress = true;
      this.bearerTokenSubject.next(null);

      return this.planqkPlatformLoginService
        .refreshLoginToPlanqkPlatform()
        .pipe(
          switchMap((res) => {
            this.refreshTokenInProgress = false;
            this.bearerTokenSubject.next(res.access_token);
            return next.handle(this.addBearerToken(request, res.access_token));
          })
        );
    } else {
      return this.bearerTokenSubject.pipe(
        filter((bearerToken) => bearerToken !== null),
        take(1),
        switchMap((bearerToken) =>
          next.handle(this.addBearerToken(request, bearerToken))
        )
      );
    }
  }
}
