import { LocalizedString } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cars',
    loadChildren:() => import('./cars/cars.module').then(m => m.CarsModule)
  },
  {
    path: 'components',
    loadChildren:() => import('./components/components.module').then(c => c.ComponentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
