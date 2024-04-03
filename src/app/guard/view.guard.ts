import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { NavigationService } from '../../services/navigation-service/navigation.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@Injectable({
  providedIn: 'root',
})
export class ViewGuard implements CanActivate {
  constructor(
    private navigationService: NavigationService,
    private cookieService: SsrCookieService
  ) {}

  canActivate(): boolean {
    const isLoggedIn = this.cookieService.get('user_uid');

    if (!isLoggedIn) {
      this.navigationService.navigateByUrlTree(['/']);
      return false;
    }

    return true;
  }
}
