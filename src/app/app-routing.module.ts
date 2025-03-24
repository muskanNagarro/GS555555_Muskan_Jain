import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { SkuComponent } from './sku/sku.component';
import { PlanningComponent } from './planning/planning.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'store', component: StoreComponent },
  { path: 'sku', component: SkuComponent },
  { path: 'planning', component: PlanningComponent },
  { path: '', redirectTo: '/store', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
