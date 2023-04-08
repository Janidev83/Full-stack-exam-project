import { StorageService } from 'src/app/service/storage/storage.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, switchMap, throwError } from "rxjs";
import { AuthService } from 'src/app/service/auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.storageService.getLocalStorageItems('accessToken');
    let request = req;

    if(accessToken) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });
    }

    return next.handle(request)
    .pipe(catchError(err => {
      if(err.error.message === 'Invalid or expired access token') {
        return this.authService.refresh().pipe(
          switchMap(tokenData => {
            const newRequest = request.clone({
              headers: request.headers.set('Authorization', `Bearer ${tokenData.accessToken}`)
            });
            return next.handle(newRequest);
          })
        )
      }
      if(err.status === 401) {
        return throwError(() => new Error('You must login first'));
      }
      if(err.status === 500 || err.status === 400) {
        return throwError(() => new Error('Something went wrong'));
      }
      return throwError(() => new Error(err.error.message));
    }))
  }

}
