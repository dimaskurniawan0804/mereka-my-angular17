import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewGuard } from '../guard/view.guard';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'todo',
    loadChildren: () => import('./todos/todo.module').then((m) => m.TodoModule),
    canActivate: [ViewGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
