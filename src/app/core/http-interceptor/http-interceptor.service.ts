import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { EMPTY, Observable, Subscription, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Injectable, Inject } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private _router: Router,
    @Inject('config') private config: any
  ) {
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    if (navigator.onLine) {
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if (
            err.url &&
            err.status === 400
          ) {
            console.log('err.status === 400');
            console.log(err.url);
            // Logout from App
            this._router.navigateByUrl('/');

            return throwError(err);
          } else if (err.status === 401) {
            console.log(err);
            console.log('err.status === 401');
            console.log(err.url);
            const authReq = req.clone({withCredentials: true});
            return next.handle(authReq);
          } else {
            return throwError(err);
          }
        })
      );
    } else {
      return EMPTY;
    }
  }
}
