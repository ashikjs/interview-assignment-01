import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('@pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'booking-details/:id',
    loadChildren: () => import('@pages/booking-details/booking-details.module').then((m) => m.BookingDetailsModule),
  },
  {
    path: '404',
    loadChildren: () =>
      import('@pages/not-found-page/not-found-page.module').then((m) => m.AppNotFoundPageModule),
  },
  {
    path: '**',
    redirectTo: '/404',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
