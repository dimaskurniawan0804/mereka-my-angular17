import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/pages.module').then((mod) => mod.PagesModule),
  },
];
