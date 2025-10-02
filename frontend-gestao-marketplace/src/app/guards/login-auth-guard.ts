import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth';
import { UserService } from '../services/user';
import { firstValueFrom } from 'rxjs';

export const loginAuthGuard: CanActivateFn = async (route, state) => {
  const _userAuthService = inject(UserAuthService);
  const _userService = inject(UserService);
  const _router = inject(Router);

  // Token inexistente, permite o acesso à página de login
  const HAS_TOKEN = _userAuthService.getUserToken();
  if (!HAS_TOKEN) return true;

  try {
    await firstValueFrom(_userService.validateUser());

    // Token válido, redireciona para a página de produtos
    return _router.navigate(['/products']);
  } catch (error) {
    // Token inválido, permite o acesso à página de login
    return true;
  }
};
