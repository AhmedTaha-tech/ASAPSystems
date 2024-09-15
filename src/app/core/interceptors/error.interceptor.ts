import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.status === 401) {
          errorMessage = 'Unauthorized Access';
          this.router.navigate(['/login']);
        }
        else if (error.status === 500) {
          errorMessage = 'Server Error';
        }
        else {
          errorMessage = `Error: ${error.message}`;
        }

        console.error(errorMessage);
        return throwError(() => errorMessage);
      })
    );
  }
}