import { Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private router: Router) {}

  navigateByUrlTree(
    commands: any[],
    extras?: {
      queryParams?: { [key: string]: any };
      fragment?: string;
      preserveQueryParams?: boolean;
      queryParamsHandling?: 'merge' | 'preserve' | '';
      preserveFragment?: boolean;
      skipLocationChange?: boolean;
      replaceUrl?: boolean;
    }
  ): Promise<boolean> {
    const urlTree: UrlTree = this.router.createUrlTree(commands, extras);
    return this.router.navigateByUrl(urlTree, extras);
  }
}
