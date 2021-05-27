import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authToken = '';

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (
      req.url.toString().includes('qc-catalog') &&
      localStorage.getItem('bearerToken')
    ) {
      this.authToken = localStorage.getItem('bearerToken');
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authToken),
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
