import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user';
import { inject } from '@angular/core';
import { UserAuthService } from '../services/user-auth';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const _userService = inject(UserService);
  const _userAuthService = inject(UserAuthService);
  const _router = inject(Router);

  // Não possui token, redireciona para login
  const HAS_TOKEN = _userAuthService.getUserToken();
  if (!HAS_TOKEN) {
    return _router.navigate(['/login']);
  }

  try {
    // Tenta validar o usuário com o token no backend
    await firstValueFrom(_userService.validateUser());

    // Se o token é válido e a rota não for o login, permite o acesso à rota desejada
    return true;
  } catch (error) {
    // Se a validação falhar, redireciona para o login
    return _router.navigate(['/login']);
  }
};
