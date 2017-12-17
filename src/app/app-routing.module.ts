import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HugNassauComponent } from './hug-nassau/hug-nassau.component';
import { HugPandionComponent } from './hug-pandion/hug-pandion.component';

const routes: Routes = [
  { path: '', redirectTo: '/nassua', pathMatch: 'full' },
  { path: 'nassua', component: HugNassauComponent },
  { path: 'pandion', component: HugPandionComponent }
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}