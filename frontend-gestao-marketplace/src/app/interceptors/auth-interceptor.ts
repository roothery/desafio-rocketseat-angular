import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserAuthService } from '../services/user-auth';

export const authInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const _userAuthService = inject(UserAuthService);

  const HAS_TOKEN = _userAuthService.getUserToken();
  if (HAS_TOKEN) {
    const newRequest = request.clone({
      headers: request.headers.append('Authorization', `Bearer ${HAS_TOKEN}`),
    });
    return next(newRequest);
  }

  return next(request);
};
