import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';

  export class AuthenticationInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const localStorage = inject(LocalStorageService);
      const authToken = localStorage.retrieveTokenFromLocalStorage();
      
      const isTransactionService = req.url.includes('/transaction');
      const isItemService = req.url.includes('/item');
  
      if (authToken && (isTransactionService || isItemService)) {
        const authReq = req.clone({
          setHeaders: { Authorization: `Bearer ${authToken}` }
        });
  
        return next.handle(authReq);
      }
  
      return next.handle(req);
    }
  }
