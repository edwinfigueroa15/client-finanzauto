import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

export const httpHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  const authorizedRequest = req.clone({
    setHeaders : {
      Authorization : `Bearer ${localStorage.getItem('client_token')}` 
    }
  });

  return next(authorizedRequest).pipe(
    map(( event: HttpEvent<any> ) => event),
    catchError(( err: any) => throwError(() => err))
  ) as Observable<HttpEvent<any>>;
};
